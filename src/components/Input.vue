<template>
    <!--Ocupamos el v-model para que tenga interacción en tiempo real
    y este se lo pase a texto LO CAMBIAMOS POR OBJETO
    Y AHORA ES TAREA.NOMBRE definido en el data(), el v-model es para la comunicación-->
    <!-- TEXTO INPUT --------------------------------------------------->
    <!-- Se utiliza el Trim este se pone en v-model, 
    el trim hace que si ponemos espacios al insertar algo los elimine -->
    <div class="mb-3">
        <label for="firstname" class="form-label my-2">Nombre</label>
        <input 
            type="text" 
            class="form-control my-2" 
            placeholder="Ingrese nombre"
            v-model.trim="tarea.nombre"
            id="firstname"
        >
    </div>  
        <!--------------CHECKBOX--------------------------------------------------->
        <!--Aqui van los checkbox igual las clases son de bootstrap-->
        <label class="my-2"> Seleccione uno o más</label>
        <br>
        <div class="form-check form-check-inline">
        <!-- //TODO: En el input también ocupamos el v-model para capturar el dato -->
        <!-- El value es el que se pasa al arreglo categorias[], SE PONE EL NOMBRE javascript -->
        <!-- Tenemos que poner el v-model para que lo capture el array categorias -->
        <input type="checkbox" id='check-1' class="form-check-input" 
        v-model="tarea.categorias" value="javascript">
        <!--Como label nos da un for entonces tenemos que declarar un id en el input anterior -->
        <label for="check-1" class="form-check-label">JavaScript</label>
        </div> 
        <!--Hacemos otro pero cambiando el id y el nombre en el label -->
        <div class="form-check form-check-inline">
        <input type="checkbox" id='check-2' class="form-check-input"
        v-model="tarea.categorias" value="nodejs">
        <!--Como label nos da un for entonces tenemos que declarar un id en el input anterior -->
        <label for="check-2" class="form-check-label">Node.js</label>
        </div>
        <!-- A ver vamos a a agregar mas -->
        <div class="form-check form-check-inline">
        <input type="checkbox" id='check-3' class="form-check-input" 
        v-model="tarea.categorias" value="ptyhon">
        <label for="check-3" class="form-check-label">Python</label>
        </div> 
        <div class="form-check form-check-inline">
        <input type="checkbox" id='check-4' class="form-check-input"
        v-model="tarea.categorias" value="database">
        <label for="check-4" class="form-check-label">DataBase</label>
        </div>
        <br>
        <!------------------------RADIOS--------------------------------------------->
        <label class="my-2">Status</label>
        <div class="mt-2">
        <div class="form-check form-check-inline">
            <!--Para que seleccione solo una opción ponemos los value -->
            <input type="radio" id="radio-1" class="form-check-input" 
            v-model='tarea.estado' value='urgente'>
            <label for="radio-1" class="form-check-label">Urgente</label>
        </div>
        <!--OTRO----->
        <div class="form-check form-check-inline">
            <input type="radio" id="radio-2" class="form-check-input" 
            v-model='tarea.estado' value= 'tranquilo'>
            <label for="radio-2" class="form-check-label">Tranquilo</label>
        </div>
        </div>
        <!--------------------Number para agregar numero con botnones----------------------->
        <!--Para que no se podamos insertar alguna letra o texto escribiendo
        a entonces le pedimos v-model que a fuerzas queremos un numero-->
        <label class="my-2">Seleccione los días</label>
        <div class='mt-2'>
        <input type="number"
        class='form-control'
        v-model.number='tarea.numero'>
        </div>
    <!----------------------BOTON PARA PROCESAR---------------------------------->
    <!----------- Submit para que procese el formulario----------------->
    <!--Clases de bootstrap pero el btn-primary es para que abarque todo el espacio------>
    <div class='d-grid'>
        <!--Desabilitamos el botón y cuando el usuario introduzca un dato se habilite con (disabled)--->
        <!-- Para hacer dinamico el botón ponemos el v-bind o los : antes del disabled y que se comporte como bool 
        pero se utiliza propiedades computadas y la llamamos-->
        <button class='btn btn-primary btn-dark mt-4' type="submit" :disabled='bloquear'>
        Enviar
        </button>
    </div>
  
</template>

<script>

export default {
    //Pasamos lo que inserte el usuario con props de Home.vue y lo traemos aqui
    props: {
        //Es object porque en la data del Home.vue es un objeto
        tarea: Object
    },
     //Las propiedades computadas siempre devuelven algo
    computed: {
        bloquear(){
        //true bloquea al boton 
        return this.tarea.nombre.trim() === '' ? true : false
        }
    }
}
</script>

<style>

</style>