<template>
<!--{{usuarioAutenticado}}-->
    <!--Las clases son de bootstrap-->
    <div class="navbar navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">
            Formulario
        </router-link>
        <div class="d-flex">
            <!--Tareas también va a ser una ruta protegida, si el usuario es autenticado deberia verlas-->
            <router-link  class="btn btn-dark" to="/" v-if="usuarioAutenticado">
                Tecnología
            </router-link>
            <!--HACEMOS QUE CUANDO SE REGISTRE O INGRESE VEA TODO -->
            <!--SI NO ESTA REGISTRADO HACEMOS QUE INGRESE BIEN O QUE SE REGISTRE-->
            <router-link  class="btn btn-dark" to="/ingreso" v-if="!usuarioAutenticado">
                Ingresar
            </router-link>
            <router-link  class="btn btn-dark" to="/registro" v-if="!usuarioAutenticado">
                Registrar
            </router-link>
            <!--El botón se vera si el usuario esta autenticado-->
            <button class="btn btn-dark" v-if="usuarioAutenticado" @click="cerrarSesion">Cerrar sesión</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    //Los getter se mapean en las pripiedades computadas
    computed: {
        ...mapGetters(['usuarioAutenticado'])
    },
    //mapeamos el cerrar sesión
    methods: {
        //Y le pasamos este método al botton como @click
        ...mapActions(['cerrarSesion'])
    },
}
</script>

<style>

</style>