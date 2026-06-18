import { reactive } from 'vue'

const CLAVE_VISTA = 'bitacora_vista'
const CLAVE_FILTRO = 'bitacora_filtro'
const CLAVE_CATEGORIA = 'bitacora_categoria'
const CLAVE_ULTIMA_FOTO = 'bitacora_ultima_foto_id'

export const uiStore = reactive({
  vista: sessionStorage.getItem(CLAVE_VISTA) || 'portada',
  filtroActivo: sessionStorage.getItem(CLAVE_FILTRO) || 'ninguno',
  categoriaActiva: sessionStorage.getItem(CLAVE_CATEGORIA) || 'todas',
  ultimaFotoId: sessionStorage.getItem(CLAVE_ULTIMA_FOTO)
    ? Number(sessionStorage.getItem(CLAVE_ULTIMA_FOTO))
    : null,

  irAGaleria() {
    this.vista = 'galeria'
    sessionStorage.setItem(CLAVE_VISTA, 'galeria')
  },

  irAPortada() {
    this.vista = 'portada'
    sessionStorage.setItem(CLAVE_VISTA, 'portada')
  },

  setFiltro(valor) {
    this.filtroActivo = valor
    sessionStorage.setItem(CLAVE_FILTRO, valor)
  },

  setCategoria(valor) {
    this.categoriaActiva = valor
    sessionStorage.setItem(CLAVE_CATEGORIA, valor)
  },

  setUltimaFoto(id) {
    this.ultimaFotoId = id
    sessionStorage.setItem(CLAVE_ULTIMA_FOTO, String(id))
  }
})