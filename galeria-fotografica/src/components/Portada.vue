<template>
  <section class="portada">
    <div class="portada__marco">
      <span class="portada__sello">· BITÁCORA DE CAMPOS VOLCÁNICOS ·</span>

      <h1 class="portada__titulo">
        Senderos<br />Volcánicos
      </h1>

      <p class="portada__lema">
        Registro fotográfico de cráteres, formaciones y flora a lo largo de
        la Cordillera Volcánica Central de Costa Rica.
      </p>

      <div class="portada__ficha">
        <div class="portada__ficha-fila">
          <span class="portada__ficha-etiqueta">Estudiante</span>
          <span class="portada__ficha-valor">Victor Rodríguez Arce</span>
        </div>
        <div class="portada__ficha-fila">
          <span class="portada__ficha-etiqueta">Proyecto Personal</span>
          <span class="portada__ficha-valor">Galería fotográfica con filtros visuales</span>
        </div>
        <div class="portada__ficha-fila">
          <span class="portada__ficha-etiqueta">Framework</span>
          <span class="portada__ficha-valor">Vue</span>
        </div>
        <div class="portada__ficha-fila">
          <span class="portada__ficha-etiqueta">Curso</span>
          <span class="portada__ficha-valor">IF7102 - Multimedios</span>
        </div>
        <div class="portada__ficha-fila">
          <span class="portada__ficha-etiqueta">Fecha</span>
          <span class="portada__ficha-valor">{{ fechaHoy }}</span>
        </div>
      </div>

      <ControlAudio variante="portada" />

      <button class="portada__boton" type="button" @click="uiStore.irAGaleria()">
        Entrar a la bitácora
        <span class="portada__boton-flecha">→</span>
      </button>
    </div>

    <div class="portada__textura" aria-hidden="true">
      <span v-for="n in 24" :key="n" class="portada__particula"></span>
    </div>
  </section>
</template>

<script>
import { uiStore } from '../store/uiStore.js'
import ControlAudio from './ControlAudio.vue'

export default {
  name: 'Portada',
  components: { ControlAudio },
  data() {
    return {
      uiStore,
      fechaHoy: new Date().toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.portada {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  overflow: hidden;
}

.portada__marco {
  position: relative;
  z-index: 2;
  max-width: 560px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.portada__sello {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--ember-bright);
  margin-bottom: 28px;
}

.portada__titulo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(48px, 9vw, 84px);
  line-height: 1.02;
  margin: 0 0 22px;
  color: var(--bone);
  letter-spacing: -0.01em;
}

.portada__lema {
  color: var(--ash);
  font-size: 16px;
  line-height: 1.65;
  max-width: 420px;
  margin: 0 0 40px;
}

.portada__ficha {
  width: 100%;
  border-top: 1px solid rgba(236, 230, 218, 0.16);
  border-bottom: 1px solid rgba(236, 230, 218, 0.16);
  padding: 22px 0;
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.portada__ficha-fila {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 14px;
}

.portada__ficha-etiqueta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ash);
  white-space: nowrap;
  padding-top: 2px;
}

.portada__ficha-valor {
  color: var(--bone);
  font-weight: 500;
  text-align: right;
}

.portada__boton {
  margin-top: 38px;
  background: var(--ember);
  border: none;
  color: var(--carbon);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 14px 28px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: background 0.18s ease, transform 0.18s ease, gap 0.18s ease;
}

.portada__boton:hover {
  background: var(--ember-bright);
  gap: 16px;
}

.portada__boton:active {
  transform: scale(0.98);
}

.portada__boton-flecha {
  transition: transform 0.18s ease;
}

.portada__textura {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.portada__particula {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--ember);
  opacity: 0.35;
  animation: flotar 14s linear infinite;
}

.portada__particula:nth-child(odd) {
  background: var(--sulfur);
  animation-duration: 19s;
}

.portada__particula:nth-child(1) { left: 4%; top: 92%; animation-delay: -1s; }
.portada__particula:nth-child(2) { left: 12%; top: 88%; animation-delay: -3s; }
.portada__particula:nth-child(3) { left: 20%; top: 95%; animation-delay: -5s; }
.portada__particula:nth-child(4) { left: 28%; top: 90%; animation-delay: -7s; }
.portada__particula:nth-child(5) { left: 36%; top: 93%; animation-delay: -2s; }
.portada__particula:nth-child(6) { left: 44%; top: 89%; animation-delay: -9s; }
.portada__particula:nth-child(7) { left: 52%; top: 94%; animation-delay: -4s; }
.portada__particula:nth-child(8) { left: 60%; top: 91%; animation-delay: -11s; }
.portada__particula:nth-child(9) { left: 68%; top: 96%; animation-delay: -6s; }
.portada__particula:nth-child(10) { left: 76%; top: 88%; animation-delay: -8s; }
.portada__particula:nth-child(11) { left: 84%; top: 93%; animation-delay: -10s; }
.portada__particula:nth-child(12) { left: 92%; top: 90%; animation-delay: -12s; }
.portada__particula:nth-child(13) { left: 8%; top: 97%; animation-delay: -13s; }
.portada__particula:nth-child(14) { left: 16%; top: 86%; animation-delay: -1.5s; }
.portada__particula:nth-child(15) { left: 24%; top: 92%; animation-delay: -6.5s; }
.portada__particula:nth-child(16) { left: 32%; top: 87%; animation-delay: -14s; }
.portada__particula:nth-child(17) { left: 40%; top: 96%; animation-delay: -3.5s; }
.portada__particula:nth-child(18) { left: 48%; top: 89%; animation-delay: -9.5s; }
.portada__particula:nth-child(19) { left: 56%; top: 95%; animation-delay: -5.5s; }
.portada__particula:nth-child(20) { left: 64%; top: 91%; animation-delay: -10.5s; }
.portada__particula:nth-child(21) { left: 72%; top: 88%; animation-delay: -2.5s; }
.portada__particula:nth-child(22) { left: 80%; top: 94%; animation-delay: -7.5s; }
.portada__particula:nth-child(23) { left: 88%; top: 90%; animation-delay: -12.5s; }
.portada__particula:nth-child(24) { left: 96%; top: 93%; animation-delay: -4.5s; }

@keyframes flotar {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 0.5; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-100vh) scale(0.6); opacity: 0; }
}

@media (max-width: 560px) {
  .portada__ficha-fila {
    flex-direction: column;
    gap: 2px;
    text-align: left;
  }
  .portada__ficha-valor {
    text-align: left;
  }
}
</style>
