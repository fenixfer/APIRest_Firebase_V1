<template>
  <Navbar />
  <!--Para separar un poco el imput hacemos un container
  y introducimos el router (para que quede enmedio)-->
  <div class='container'>
    <!--Esto para las vistas -->
    <router-view/>
  </div>
</template>

<script>
  //Llamamos al componente Navbar
  import Navbar from './components/Navbar.vue'
  //Importamos lo localStorage lo mapeamos
  import {mapActions} from 'vuex'
  export default {
    components: {
      Navbar
    },
    methods:{
      ...mapActions(['cargarLocalStorage'])
    },
    created(){
      this.cargarLocalStorage()
    }
  }
</script>