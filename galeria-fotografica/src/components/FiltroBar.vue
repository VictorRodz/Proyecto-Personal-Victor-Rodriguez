<template>
  <div class="filtro-bar">
    <span class="filtro-bar__label">Filtros</span>
    <div class="filtro-bar__grupo" role="group" aria-label="Filtros visuales">
      <button
        v-for="filtro in filtros"
        :key="filtro.valor"
        type="button"
        class="filtro-bar__boton"
        :class="{ 'filtro-bar__boton--activo': filtroActivo === filtro.valor }"
        :aria-pressed="filtroActivo === filtro.valor"
        @click="$emit('cambiar-filtro', filtro.valor)"
      >
        {{ filtro.etiqueta }}
      </button>
    </div>

    <div class="filtro-bar__categoria">
      <span class="filtro-bar__label">Buscar por categoría</span>
      <select
        class="filtro-bar__select"
        :value="categoriaActiva"
        @change="$emit('cambiar-categoria', $event.target.value)"
      >
        <option value="todas">Todas</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiltroBar',
  props: {
    filtroActivo: { type: String, required: true },
    categoriaActiva: { type: String, required: true },
    categorias: { type: Array, required: true }
  },
  emits: ['cambiar-filtro', 'cambiar-categoria'],
  data() {
    return {
      filtros: [
        { valor: 'ninguno', etiqueta: 'Natural' },
        { valor: 'grises', etiqueta: 'Ceniza' },
        { valor: 'sepia', etiqueta: 'Sepia' },
        { valor: 'contraste', etiqueta: 'Contraste' },
        { valor: 'saturado', etiqueta: 'Saturado' }
      ]
    }
  }
}
</script>

<style scoped>
.filtro-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 28px;
  padding: 18px 0;
  border-top: 1px solid rgba(236, 230, 218, 0.12);
  border-bottom: 1px solid rgba(236, 230, 218, 0.12);
  margin-bottom: 36px;
}

.filtro-bar__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ash);
}

.filtro-bar__grupo {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filtro-bar__boton {
  background: transparent;
  border: 1px solid rgba(236, 230, 218, 0.25);
  color: var(--bone);
  padding: 7px 14px;
  border-radius: 2px;
  font-size: 13px;
  letter-spacing: 0.02em;
  transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
}

.filtro-bar__boton:hover {
  border-color: var(--ember-bright);
}

.filtro-bar__boton--activo {
  background: var(--ember);
  border-color: var(--ember);
  color: var(--carbon);
  font-weight: 600;
}

.filtro-bar__categoria {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.filtro-bar__select {
  background: var(--carbon-soft);
  border: 1px solid rgba(236, 230, 218, 0.25);
  color: var(--bone);
  padding: 6px 10px;
  border-radius: 2px;
  font-size: 13px;
}

@media (max-width: 640px) {
  .filtro-bar__categoria {
    margin-left: 0;
  }
}
</style>
