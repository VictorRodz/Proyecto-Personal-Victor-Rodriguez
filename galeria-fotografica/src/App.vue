<template>
  <div class="pagina">
    <audio
      ref="audioRef"
      loop
      preload="auto"
    ></audio>

    <Transition name="vista" mode="out-in">
      <Portada v-if="uiStore.vista === 'portada'" key="portada" />

      <div v-else key="galeria" class="vista-galeria">
        <header class="hero">
          <button class="hero__volver" type="button" @click="uiStore.irAPortada()">
            ← Portada
          </button>

          <div class="hero__marca">
            <span class="hero__linea"></span>
          </div>
          <h1 class="hero__titulo">Bitácora de<br />Senderos Volcánicos</h1>
          <p class="hero__subtitulo">
            Doce registros fotográficos de cráteres, formaciones y flora a lo largo
            de la Cordillera Volcánica Central de Costa Rica.
          </p>

          <ControlAudio variante="galeria" />
        </header>

        <main class="contenido">
          <Galeria />
        </main>

        <footer class="pie">
          <span>Victor Rodríguez Arce — IF7102 - Multimedios</span>
        </footer>
      </div>
    </Transition>
  </div>
</template>

<script>
import Galeria from './components/Galeria.vue'
import Portada from './components/Portada.vue'
import ControlAudio from './components/ControlAudio.vue'
import { uiStore } from './store/uiStore.js'
import { audioStore } from './store/audioStore.js'

export default {
  name: 'App',
  components: { Galeria, Portada, ControlAudio },
  data() {
    return { uiStore }
  },
  watch: {
    'uiStore.vista'(nuevaVista) {
      audioStore.cambiarPista(nuevaVista)
    }
  },
  mounted() {
    audioStore.registrarElemento(this.$refs.audioRef)
    audioStore.cambiarPista(this.uiStore.vista)
  }
}
</script>

<style scoped>
.pagina {
  max-width: 1180px;
  margin: 0 auto;
}

.vista-galeria {
  padding: 64px 32px 80px;
}

.vista-enter-active,
.vista-leave-active {
  transition: opacity 0.28s ease;
}

.vista-enter-from,
.vista-leave-to {
  opacity: 0;
}

.hero {
  margin-bottom: 56px;
  position: relative;
}

.hero__volver {
  background: transparent;
  border: none;
  color: var(--ash);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  padding: 0;
  margin-bottom: 24px;
  transition: color 0.18s ease;
}

.hero__volver:hover {
  color: var(--ember-bright);
}

.hero__marca {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.hero__sello {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--ember-bright);
}

.hero__linea {
  flex: 1;
  height: 1px;
  background: rgba(236, 230, 218, 0.18);
  max-width: 220px;
}

.hero__titulo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(40px, 6vw, 68px);
  line-height: 1.04;
  margin: 0 0 18px;
  color: var(--bone);
  letter-spacing: -0.01em;
}

.hero__subtitulo {
  max-width: 540px;
  color: var(--ash);
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 34px;
}

.pie {
  margin-top: 70px;
  padding-top: 22px;
  border-top: 1px solid rgba(236, 230, 218, 0.12);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ash);
  letter-spacing: 0.04em;
}

@media (max-width: 560px) {
  .vista-galeria {
    padding: 44px 20px 60px;
  }
}
</style>
