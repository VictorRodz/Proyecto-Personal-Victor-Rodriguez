<template>
  <section class="galeria">
    <div v-if="cargando" class="galeria__estado">
      Cargando bitácora…
    </div>

    <div v-else-if="errorCarga" class="galeria__estado galeria__estado--error">
      No se pudo cargar la metadata de las fotografías. Verifica que
      <code>fotos.json</code> exista en la carpeta <code>public/</code>.
    </div>

    <template v-else>
      <FiltroBar
        :filtro-activo="uiStore.filtroActivo"
        :categoria-activa="uiStore.categoriaActiva"
        :categorias="categoriasDisponibles"
        @cambiar-filtro="uiStore.setFiltro($event)"
        @cambiar-categoria="uiStore.setCategoria($event)"
      />

      <p class="galeria__conteo">
        {{ fotosFiltradas.length }} {{ fotosFiltradas.length === 1 ? 'imagen' : 'imágenes' }} en bitácora
      </p>

      <div class="galeria__grid">
        <TarjetaFoto
          v-for="foto in fotosFiltradas"
          :key="foto.id"
          :foto="foto"
          :filtro-estilo="claseFiltro"
          @abrir="abrirLightbox"
        />
      </div>

      <Lightbox
        :foto="fotoSeleccionada"
        :filtro-estilo="claseFiltro"
        @cerrar="cerrarLightbox"
        @anterior="navegar(-1)"
        @siguiente="navegar(1)"
      />
    </template>
  </section>
</template>

<script>
import FiltroBar from './FiltroBar.vue'
import TarjetaFoto from './TarjetaFoto.vue'
import Lightbox from './Lightbox.vue'
import { uiStore } from '../store/uiStore.js'

const MAPA_FILTROS = {
  ninguno: 'none',
  grises: 'grayscale(100%)',
  sepia: 'sepia(85%)',
  contraste: 'contrast(145%) brightness(0.95)',
  saturado: 'saturate(220%)'
}

export default {
  name: 'Galeria',
  components: { FiltroBar, TarjetaFoto, Lightbox },
  data() {
    return {
      uiStore,
      fotos: [],
      cargando: true,
      errorCarga: false,
      fotoSeleccionada: null
    }
  },
  computed: {
    claseFiltro() {
      return MAPA_FILTROS[this.uiStore.filtroActivo] || 'none'
    },
    categoriasDisponibles() {
      return [...new Set(this.fotos.map((f) => f.categoria))]
    },
    fotosFiltradas() {
      if (this.uiStore.categoriaActiva === 'todas') return this.fotos
      return this.fotos.filter((f) => f.categoria === this.uiStore.categoriaActiva)
    }
  },
  async mounted() {
    await this.cargarFotos()

    // Si el usuario había dejado una foto abierta antes de refrescar,
    // la restauramos en el lightbox.
    if (this.uiStore.ultimaFotoId) {
      const foto = this.fotos.find((f) => f.id === this.uiStore.ultimaFotoId)
      if (foto) this.fotoSeleccionada = foto
    }
  },
  methods: {
    async cargarFotos() {
      this.cargando = true
      this.errorCarga = false
      try {
        const respuesta = await fetch('/fotos.json')
        if (!respuesta.ok) throw new Error('Respuesta no válida del servidor')
        this.fotos = await respuesta.json()
      } catch (error) {
        console.error('Error al cargar fotos.json:', error)
        this.errorCarga = true
      } finally {
        this.cargando = false
      }
    },
    abrirLightbox(foto) {
      this.fotoSeleccionada = foto
      this.uiStore.setUltimaFoto(foto.id)
    },
    cerrarLightbox() {
      this.fotoSeleccionada = null
      this.uiStore.setUltimaFoto(null)
    },
    navegar(direccion) {
      const lista = this.fotosFiltradas
      const indiceActual = lista.findIndex((f) => f.id === this.fotoSeleccionada.id)
      const nuevoIndice = (indiceActual + direccion + lista.length) % lista.length
      this.fotoSeleccionada = lista[nuevoIndice]
      this.uiStore.setUltimaFoto(this.fotoSeleccionada.id)
    }
  }
}
</script>

<style scoped>
.galeria {
  width: 100%;
}

.galeria__estado {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ash);
  padding: 60px 0;
  text-align: center;
}

.galeria__estado--error {
  color: var(--ember-bright);
}

.galeria__conteo {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ash);
  margin: 0 0 20px;
}

.galeria__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 22px;
}
</style>
