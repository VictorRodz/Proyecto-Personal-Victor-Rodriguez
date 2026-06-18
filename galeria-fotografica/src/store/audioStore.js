import { reactive } from 'vue'

const CLAVE_VOLUMEN = 'bitacora_volumen'
const CLAVE_REPRODUCIENDO = 'bitacora_reproduciendo'

const PISTAS = {
  portada: '/audio/bienvenida-portada.mp3',
  galeria: '/audio/viento-cratere.mp3'
}

function leerVolumenGuardado() {
  const valor = sessionStorage.getItem(CLAVE_VOLUMEN)
  return valor !== null ? Number(valor) : 0.5
}

function leerReproduciendoGuardado() {
  return sessionStorage.getItem(CLAVE_REPRODUCIENDO) === 'true'
}

export const audioStore = reactive({
  elemento: null,
  reproduciendo: false,
  volumen: leerVolumenGuardado(),
  listoParaAutoplay: leerReproduciendoGuardado(),
  pistaActual: null,

  registrarElemento(el) {
    this.elemento = el
    el.volume = this.volumen
    // Si el usuario lo dejó sonando antes de refrescar, lo retomamos
    // en el primer gesto del usuario (los navegadores móviles bloquean
    // el autoplay con audio hasta que hay una interacción real).
    if (this.listoParaAutoplay) {
      const intentarReanudar = () => {
        el.play().then(() => {
          this.reproduciendo = true
        }).catch(() => {
          this.reproduciendo = false
        })
        window.removeEventListener('pointerdown', intentarReanudar)
        window.removeEventListener('keydown', intentarReanudar)
      }
      window.addEventListener('pointerdown', intentarReanudar, { once: true })
      window.addEventListener('keydown', intentarReanudar, { once: true })
    }
  },

  // Cambia la pista según la vista ('portada' o 'galeria').
  // Si ya estaba sonando, sigue sonando pero con el nuevo audio.
  cambiarPista(vista) {
    const nuevaPista = PISTAS[vista]
    if (!nuevaPista || !this.elemento || this.pistaActual === nuevaPista) return

    const estabaReproduciendo = this.reproduciendo
    this.pistaActual = nuevaPista
    this.elemento.src = nuevaPista
    this.elemento.load()

    if (estabaReproduciendo) {
      this.elemento.play().then(() => {
        this.reproduciendo = true
      }).catch(() => {
        this.reproduciendo = false
      })
    }
  },

  alternar() {
    if (!this.elemento) return
    if (this.reproduciendo) {
      this.elemento.pause()
      this.reproduciendo = false
    } else {
      this.elemento.play().then(() => {
        this.reproduciendo = true
      }).catch(() => {
        this.reproduciendo = false
      })
    }
    sessionStorage.setItem(CLAVE_REPRODUCIENDO, String(this.reproduciendo))
  },

  cambiarVolumen(nuevoValor) {
    this.volumen = nuevoValor
    if (this.elemento) {
      this.elemento.volume = nuevoValor
    }
    sessionStorage.setItem(CLAVE_VOLUMEN, String(nuevoValor))
  }
})