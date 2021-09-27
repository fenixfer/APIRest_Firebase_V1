<template>
<!-- {{$route.params.id}} Esto captura lo que viene de la URL -->
  <!-- Si sirve pero solo se pone en el proceso
  Editar {{$route.params.id}} - {{ tarea }} -->
  <!--El .prevent es para que no se actualice nuestra página por ahora -->
  <!--El submit recibe la tarea que modifico -->
<form @submit.prevent="actualizarTarea(tarea)">
  <!--Aqui recibe la tarea -->
        <Input :tarea="tarea"/>
</form>
</template>

<script>
import {mapState, mapActions} from 'vuex'
//Llamamos al component 
import Input from '../components/Input.vue'
export default {
    components: {
        Input 
    },
    computed: {
        ...mapState(['tarea'])
    },
    methods: {
        ...mapActions(['obtenerTarea','actualizarTarea'])
    },
    created(){
        this.obtenerTarea(this.$route.params.id)
    },
}
</script>

<style>

</style>