<template>
    <h1 class="my-5">Registro de Usuarios</h1>
    <br>
    <!--Esta alerta es igual como a la de ingreso -->
    <div class="alert alert-danger" v-if="error.tipo != null">{{error.mensaje}}</div>
    <!-- le mandamos el email y el password solo el primero-->
    <form @submit.prevent="procesarFormulario">
        <div class="mb-3">
            <label for="idemail" class="form-label">Email</label>
            <!--Sin espacios le agregamos el v-model.trim  y el email es lo del data-->
            <input type="email" placeholder="example@gmail.com" class="form-control" id="idemail"
            v-model.trim="email" :class="[error.tipo === 'email' ? 'is-invalid': '']">
        </div>
        <div class="mb-3">
            <label for="idpass1" class="form-label">Password</label>
            <input type="password" placeholder="password" class="form-control" id="idpass1"
            v-model.trim="pass1" aria-describedby="passdes1">
            <div id="passdes1" class="form-text">
                Password mayor de 6 caracteres sin espacios.
            </div>
        </div>
        <div class="mb-3">
            <label for="idpass2" class="form-label">Repeat Password</label>
            <input type="password" placeholder="password" class="form-control" id="idpass2"
            v-model.trim="pass2">
        </div>
        <br>
        <!--disabled de bloquear es el método de las propiedades computarizadas -->
        <button type="submit" class="btn btn-success" :disabled="bloquear">Registrar</button>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    computed: {
        bloquear(){
            //Haciendo las validaciones
            if(!this.email.includes('@')){
                return true 
            }
            //El método para el password
            if(this.pass1.length > 5 && this.pass1 === this.pass2){
                return false 
            }else {
                return true
            }
        },
        ...mapState(['error'])
    },
    methods: {
        ...mapActions(['registrarUsuario']),
        //para que cuando mandemos el formulario limpie los campos
        async procesarFormulario(){
            await this.registrarUsuario({email: this.email, password: this.pass1})
            //Si no son validas las credenciales entonces que queden esos mismos datos para que lo acomode
            if(this.error.tipo !== null){
                return
            }
            this.email = '';
            this.pass1 = '';
            this.pass2 = '';
        }
    }
}
</script>
