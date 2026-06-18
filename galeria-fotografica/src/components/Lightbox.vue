<template>
  <Transition name="fade">
    <div
      v-if="foto"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="foto.titulo"
      @click.self="$emit('cerrar')"
    >
      <button
        class="lightbox__cerrar"
        type="button"
        aria-label="Cerrar imagen"
        @click="$emit('cerrar')"
      >
        ✕
      </button>

      <button
        class="lightbox__nav lightbox__nav--prev"
        type="button"
        aria-label="Foto anterior"
        @click="$emit('anterior')"
      >
        ‹
      </button>

      <figure class="lightbox__contenido" :style="{ filter: filtroEstilo }">
        <img :src="foto.src" :alt="foto.titulo" />
      </figure>

      <button
        class="lightbox__nav lightbox__nav--next"
        type="button"
        aria-label="Foto siguiente"
        @click="$emit('siguiente')"
      >
        ›
      </button>

      <div class="lightbox__info">
        <span class="lightbox__categoria">{{ foto.categoria }} · {{ foto.fecha }}</span>
        <h2 class="lightbox__titulo">{{ foto.titulo }}</h2>
        <p class="lightbox__descripcion">{{ foto.descripcion }}</p>
        <span class="lightbox__ubicacion">{{ foto.ubicacion }}</span>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Lightbox',
  props: {
    foto: { type: Object, default: null },
    filtroEstilo: { type: String, default: 'none' }
  },
  emits: ['cerrar', 'anterior', 'siguiente'],
  mounted() {
    window.addEventListener('keydown', this.manejarTeclado)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.manejarTeclado)
  },
  methods: {
    manejarTeclado(e) {
      if (!this.foto) return
      if (e.key === 'Escape') this.$emit('cerrar')
      if (e.key === 'ArrowLeft') this.$emit('anterior')
      if (e.key === 'ArrowRight') this.$emit('siguiente')
    }
  }
}
</script>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 9, 7, 0.92);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  z-index: 100;
  padding: 24px;
}

.lightbox__contenido {
  margin: 0;
  max-width: 78vw;
  max-height: 70vh;
  justify-self: center;
}

.lightbox__contenido img {
  max-width: 100%;
  max-height: 70vh;
  display: block;
  border-radius: 2px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.lightbox__cerrar {
  position: absolute;
  top: 24px;
  right: 28px;
  background: transparent;
  border: 1px solid rgba(236, 230, 218, 0.3);
  color: var(--bone);
  font-size: 16px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox__cerrar:hover {
  border-color: var(--ember-bright);
  color: var(--ember-bright);
}

.lightbox__nav {
  background: transparent;
  border: none;
  color: var(--bone);
  font-size: 48px;
  line-height: 1;
  padding: 0 16px;
  opacity: 0.6;
  transition: opacity 0.18s ease, color 0.18s ease;
}

.lightbox__nav:hover {
  opacity: 1;
  color: var(--ember-bright);
}

.lightbox__info {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lightbox__categoria {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sulfur);
}

.lightbox__titulo {
  font-family: var(--font-display);
  font-size: 24px;
  margin: 2px 0;
  color: var(--bone);
}

.lightbox__descripcion {
  color: var(--ash);
  font-size: 14px;
  max-width: 520px;
  margin: 0 auto;
}

.lightbox__ubicacion {
  font-size: 12px;
  color: var(--ember-bright);
  margin-top: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .lightbox {
    grid-template-columns: 1fr;
  }
  .lightbox__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .lightbox__nav--prev { left: 6px; }
  .lightbox__nav--next { right: 6px; }
}
</style>
