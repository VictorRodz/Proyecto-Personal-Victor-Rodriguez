<template>
  <figure
    class="tarjeta"
    :style="{ filter: filtroEstilo }"
    @click="$emit('abrir', foto)"
  >
    <img :src="foto.src" :alt="foto.titulo" loading="lazy" />
    <figcaption class="tarjeta__caption">
      <span class="tarjeta__numero">{{ String(foto.id).padStart(2, '0') }}</span>
      <span class="tarjeta__titulo">{{ foto.titulo }}</span>
      <span class="tarjeta__ubicacion">{{ foto.ubicacion }}</span>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'TarjetaFoto',
  props: {
    foto: { type: Object, required: true },
    filtroEstilo: { type: String, default: 'none' }
  },
  emits: ['abrir']
}
</script>

<style scoped>
.tarjeta {
  margin: 0;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  cursor: zoom-in;
  background: var(--carbon-soft);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tarjeta:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.45);
}

.tarjeta img {
  display: block;
  width: 100%;
  height: 230px;
  object-fit: cover;
  transition: filter 0.25s ease;
}

.tarjeta__caption {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 14px 14px;
}

.tarjeta__numero {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ember-bright);
  letter-spacing: 0.08em;
}

.tarjeta__titulo {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  color: var(--bone);
  line-height: 1.25;
}

.tarjeta__ubicacion {
  font-size: 12px;
  color: var(--ash);
}
</style>
