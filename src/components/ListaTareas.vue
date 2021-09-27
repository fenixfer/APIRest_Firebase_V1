<template>
  <!--Traemos una tablita de Bootstrap -->
  <!--Las clases son de bootstrap------->
  <!-- {{tareas}} -->
  <table class="table">
  <thead class="table-dark">
    <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categorías</th>
        <th scope="col">Estado</th>
        <th scope="col">Número</th>
        <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
      <!--//TODO: Como vamos a insertar varios datos o arreglos 
      //TODO: entonces declaramos un v-for para recorrerlo -->
      <!-- Ya hay un id entonces ponemos la key item.id -->
    <tr v-for="item in tareas" :key="item.id">
        <!--El item recorre las tareas entonces accede a las tareas ya declaradas en el v-for-->
        <th scope='row'>{{ item.id }}</th>
        <td>{{ item.nombre }}</td>
        <!--Quitamos el formato de arreglo y lo pintamos mas amigable
        pero tenemos que recorrer en un for -->
        <td>
            <!--Necesitamos el index del array entonces ponemos cat -->
            <span v-for="(cat, index) in item.categorias" :key="index">
                 <!--Ponemos el cat es el lugar y nombre que nos trae al recorrer -->
                <!--{{ cat }} -->
                {{
                    (item.categorias.length === index + 1) ? cat : cat + ','
                }}
            </span>
        </td> 
        <!-- MEJOR OCUPAMOS EL la funcón toString() QUE SEPARA LOS DATOS DEL ARREGLO POR COMAS --->
        <!--<td>{{item.categorias.toString()}}</td> -->
        <!-- MEJOR UTILIZAMOS UN JOIN -->
        <!--<td> {{ item.categorias.join(', ')}}</td>-->
        <td>{{ item.estado }}</td>
        <td>{{ item.numero }}</td>
        <td>
            <!--Llamamso el methods que ya es un evento y ocupamos @click-->
            <!-- Pero en el método le enviamos el id para no cagarla y eliminar otro o todos -->
            <button class='btn btn-danger btn-sm' @click="deleteTareas(item.id)">
                Eliminar
            </button>
            <!-----------EL BOTÓN PARA EDITAR LO LLAMAMOS ------->
            <!-- El to es dinámico y eñ name: Editar es el de la ruta declarada en el router-->
            <!--El item.id es el que tenemos por cada registro es el del boton delete-->
            <router-link 
            class="btn btn-warning ml-2 btn-sm" 
            :to="{
                name: 'Editar',
                params: { 
                    id: item.id 
                    }
                }">
                Editar
            </router-link>
        </td>
    </tr>
  </tbody>
</table>
</template>

<script>
//AQUI SI LLAMAMOS LO DE LA TIENDA PORQUE NECESITAMOS ESOS DATOS ENTONCES MAPEAMOS
import {mapState, mapActions} from 'vuex'
export default {
    computed: {
        //Llamamos el objeto tareas de la tienda lo mapeamos
        //Como es un objeto entonces es un arreglo y lo ponemos con corchetes
        ...mapState(['tareas'])
    },
    methods: {
        ...mapActions(['deleteTareas'])
    }
}
</script>

<style>

</style>