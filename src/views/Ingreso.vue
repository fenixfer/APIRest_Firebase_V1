<template>
    <h1 class="my-5">Ingreso de Usuarios</h1>
    <!--Le pasamos el email invalido de setError de la mutación en index.js pero 
    se tiene que mostrar si existen los errores entonces ponemos un v-if
    El distinto de null !== es ek que se declara en estado de index.js de la tienda
    Tenemos que mapear el error también entonces lo declaramos en las propiedades computadas-->
    <div class="alert alert-danger" v-if="error.tipo != null">{{error.mensaje}}</div>
    <br>
    <!-- le mandamos el email y el password solo el primero-->
    <form @submit.prevent="procesarFormulario">
        <div class="mb-3">
            <label for="idemail" class="form-label">Email</label>
            <!--Sin espacios le agregamos el v-model.trim  y el email es lo del data-->
            <!--La clase dinamica es por si el email es invalido o no existe, el is-invalid es de bootstrap -->
            <input type="email" placeholder="example@gmail.com" class="form-control" id="idemail"
            v-model.trim="email" :class="[error.tipo === 'email' ? 'is-invalid': '']">
        </div>
        <div class="mb-3">
            <label for="idpass1" class="form-label">Password</label>
            <!-- Hacemos igual como el email pero ahora con el password -->
            <input type="password" placeholder="password" class="form-control" id="idpass1"
            v-model.trim="pass1" :class="[error.tipo === 'password' ? 'is-invalid': '']">
        </div>
        <br>
        <!--disabled de bloquear es el método de las propiedades computarizadas -->
        <button type="submit" class="btn btn-success" :disabled="bloquear">Ingresar</button>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            email: '',
            pass1: ''
        }
    },
    computed: {
        bloquear(){
            //Haciendo las validaciones
            if(!this.email.includes('@')){
                return true 
            }
            //El método para el password
            if(this.pass1.length > 5){
                return false 
            }else {
                return true
            }
        },
        //Mapeamos el error que se declara en la alerta y llamamos al error
        ...mapState(['error'])
    },
    methods: {
        ...mapActions(['ingresoUsuario']),
        //para que cuando mandemos el formulario limpie los campos
        async procesarFormulario(){
            //el await espera la respuesta del servidor
            await this.ingresoUsuario({email: this.email, password: this.pass1})
            //Si no son validas las credenciales entonces que queden esos mismos datos para que lo acomode
            if(this.error.tipo !== null){
                return
            }
            this.email = '';
            this.pass1 = '';
        }
    }
}
</script>
