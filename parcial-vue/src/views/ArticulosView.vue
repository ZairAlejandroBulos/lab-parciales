<template>
    <div class="container">
        <div class="mb-3">
            <label for="idrubro" class="form-label">Rubro</label>
            <select v-model="selectedRubroId" @change="handleChangeRubro" class="form-select">
                <option value="-1">--Seleccione--</option>
                <option v-for="rubro in rubros" :value="rubro.id" :key="rubro.id">{{ rubro.denominacion }}</option>
            </select>
        </div>
    </div>

    <div class="container mb-3">
        <router-link :to="'/form/-1'" class="btn btn-success">
            Nuevo
        </router-link>
    </div>

    <div class="container">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>CÓDIGO</th>
                    <th>DENOMINACIÓN</th>
                    <th>PRECIO</th>
                    <th colspan="2">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="articulo in articulos" :key="articulo.id">
                    <td>{{ articulo.id }}</td>
                    <td>{{ articulo.codigo }}</td>
                    <td>{{ articulo.denominacion }}</td>
                    <td>{{ articulo.precio }}</td>
                    <td>
                        <router-link :to="'/form/' + articulo.id" class="btn btn-warning">
                            Editar
                        </router-link>
                    </td>
                    <td>
                        <button v-if="articulo.id" @click="handleDelete(articulo.id!)" class="btn btn-danger">
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Articulo } from '../types/Articulo';
import { Rubro } from '../types/Rubro';
import { findAllRubros } from '../services/RubroService';
import { deleteArticulo, findArticuloByRubro } from '../services/ArticuloService';

export default defineComponent({
    setup() {
        const rubros = ref<Rubro[]>([]);
        const articulos = ref<Articulo[]>([]);
        const selectedRubroId = ref<number>(-1);

        onMounted(async () => {
            rubros.value = await findAllRubros();
        });

        const getArticulosByRubro = async (idrubro: number) => {
            articulos.value = await findArticuloByRubro(idrubro);
        };

        const handleChangeRubro = async () => {
            getArticulosByRubro(selectedRubroId.value);
        };

        const handleDelete = async (id: number) => {
            await deleteArticulo(id);
            window.location.reload();
        }

        return {
            rubros,
            articulos,
            selectedRubroId,
            handleChangeRubro,
            handleDelete
        };
    }
})
</script>