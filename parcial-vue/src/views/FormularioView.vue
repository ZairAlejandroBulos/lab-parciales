<template>
  <div class="container">
    <form @submit="handleSubmit">
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <input type="number" name="id" v-model="articulo.id" readonly disabled class="form-control" />
      </div>

      <div class="mb-3">
        <label for="codigo" class="form-label">Código</label>
        <input type="text" name="codigo" v-model="articulo.codigo" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="denominacion" class="form-label">Denominación</label>
        <input type="text" name="denominacion" v-model="articulo.denominacion" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="precio" class="form-label">Precio</label>
        <input type="number" name="precio" v-model="articulo.precio" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="idrubro" class="form-label">Rubro</label>
        <select name="idrubro" @change="handleChangeRubro" v-model="selectedRubroId" class="form-select">
          <option value="-1">--Seleccione--</option>
          <option v-for="rubro in rubros" :value="rubro.id" :key="rubro.id">{{ rubro.denominacion }}</option>
        </select>
      </div>

      <button type="button" @click="handleNavigate" class="btn btn-danger">
        Cancelar
      </button>

      <button type="submit" class="btn btn-success">
        Guardar
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Articulo } from '../types/Articulo';
import { Rubro } from '../types/Rubro';
import { findAllRubros } from '../services/RubroService';
import { findArticuloById, findArticuloByCodigo, saveArticulo, updateArticulo } from '../services/ArticuloService';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const selectedRubroId = ref<number>(-1);
    const codigoInicial = ref<string>('');
    const rubros = ref<Rubro[]>([]);
    const articulo = ref<Articulo>({
      codigo: '',
      denominacion: '',
      precio: 0,
      idrubro: 0,
    });
    const route = useRoute();

    onMounted(async () => {
      const id = Number(route.params.id);
      await getAllRubro();
      await getArticuloById(id);
    });

    const getAllRubro = async () => {
      rubros.value = await findAllRubros();
    };

    const getArticuloById = async (id: number) => {
      if (id !== -1) {
        articulo.value = await findArticuloById(id);
        selectedRubroId.value = articulo.value.idrubro;
        codigoInicial.value = articulo.value.codigo;
      }
    };

    const handleChangeRubro = () => {
      articulo.value.idrubro = selectedRubroId.value;
    };

    const getArticuloByCodigo = async (codigo: string) => {
      const newArticulos = await findArticuloByCodigo(codigo);
      return newArticulos.length !== 0;
    };

    const handleSubmit = async (event: Event) => {
      event.preventDefault();

      const codigoExists = await getArticuloByCodigo(articulo.value.codigo);

      if (!codigoExists || (codigoInicial.value !== '' && codigoInicial.value === articulo.value.codigo)) {
        if (articulo.value.id) {
          await updateArticulo(articulo.value);
        } else {
          await saveArticulo(articulo.value);
        }

        handleNavigate();
      } else {
        alert(`El código ${articulo.value.codigo} ya existe en otro Articulo.`);
      }
    };

    const handleNavigate = () => {
      window.location.href = '/';
    };

    return {
      selectedRubroId,
      codigoInicial,
      rubros,
      articulo,
      handleChangeRubro,
      handleSubmit,
      handleNavigate,
    };
  },
});
</script>
