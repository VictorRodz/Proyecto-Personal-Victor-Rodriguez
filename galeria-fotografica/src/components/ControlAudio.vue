<template>
  <div class="control-audio" :class="`control-audio--${variante}`">
    <button
      class="control-audio__boton"
      type="button"
      :aria-label="audioStore.reproduciendo ? 'Pausar audio ambiental' : 'Reproducir audio ambiental'"
      @click="audioStore.alternar()"
    >
      <span v-if="!audioStore.reproduciendo">▶</span>
      <span v-else>❙❙</span>
    </button>

    <span class="control-audio__etiqueta">Sonido de campo</span>

    <input
      class="control-audio__rango"
      type="range"
      min="0"
      max="1"
      step="0.01"
      :value="audioStore.volumen"
      @input="audioStore.cambiarVolumen(Number($event.target.value))"
      aria-label="Control de volumen"
    />

    <span class="control-audio__porcentaje">{{ Math.round(audioStore.volumen * 100) }}%</span>
  </div>
</template>

<script>
import { audioStore } from '../store/audioStore.js'

export default {
  name: 'ControlAudio',
  props: {
    variante: { type: String, default: 'galeria' }
  },
  data() {
    return { audioStore }
  }
}
</script>

<style scoped>
.control-audio {
  display: flex;
  align-items: center;
  gap: 14px;
}

.control-audio__boton {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  border: 1px solid var(--ember);
  background: transparent;
  color: var(--ember-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background 0.18s ease, color 0.18s ease;
  touch-action: manipulation;
}

.control-audio__boton:hover {
  background: var(--ember);
  color: var(--carbon);
}

.control-audio__etiqueta {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ash);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.control-audio__rango {
  width: 120px;
  accent-color: var(--ember);
  touch-action: manipulation;
}

.control-audio__porcentaje {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ash);
  min-width: 32px;
}

.control-audio--portada {
  margin: 0 0 12px;
  justify-content: center;
}

@media (max-width: 560px) {
  .control-audio {
    flex-wrap: wrap;
    justify-content: center;
  }
  .control-audio__rango {
    width: 100%;
    max-width: 220px;
  }
}
</style>
