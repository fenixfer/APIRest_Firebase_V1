<template>
<!--Tipo texto, las clase es de bootstrap -->
<!--FORMULARIO--> 
<!--Ocupamos el submit para que cuando apretemos llamamos al método declarado abajo
y el botón lo procese y lo pinte con console-->
<!--//TODO: POR DEFECTO TODOS LOS FORMULARIOS DE HTML HACEN EL ENVIO POR GET POR LO TANTO SE REFRESCA EL SITIO WEB PARA EVITAR EL PROCESAMIENTO COLOCAMOS .prevent en el submit pero ya no va a quitar los campos que llenamos-->
  <form @submit.prevent="procesarFormulario">
    <!--//TODO: Llamamos al input-->
    <!--tenemos que enviar las tareas y declaramos también un id-->
    <Input :tarea="tarea"/> 
  </form>
  <hr>
  <!----------Para mostrar los datos (opcional ponerlo pero es necesario al principio)--------------->
  <!-- <p> -->
    <!--Se trae todo lo que tiene el objeto tarea -->
  <!-- {{tarea}}
  </p> -->
  <!---------- Llamamos a la tabla ------------>
  <ListaTareas />
</template>

<script>
//Para llamar las propiedades por props que estan declaradas en Home la importamos
import Input from '../components/Input.vue'
//Llamamos mapActions porque la ocupamos en la store con vuex 
//y la mapeamos dentro de los methods
import {mapActions} from 'vuex'
//traemos el componente de la ListaTrea la tabla
import ListaTareas from '../components/ListaTareas.vue'

//Llamamos para generar el id
//shortid es lo de la guia 
const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    //Llamamos las propeidades con el archvio Input
    Input,
    //PONEOS AQUI LO QUE LLAMAMOS DEL COMPONENTE
    ListaTareas
  },
  //TODO: Traemos o agarramos lo que ponemos en el imput declaramos data
  data() {
    return {
      //Esta vacio porque se le pasa lo del input 'Ingrese nombre'
      // Para que se vea mas ordenado trabajamos con objetos
      //texto: ''
      tarea: {
        //declaramos el id unico esto junto con el paquete que instalamos
        id: '',
        nombre: '',
        //ocupamos array porque en los checkbox el usuario puede seleccionar uno o varios
        categorias: [],
        //para los radios
        estado: '',
        numero: 0
      }

    }
  },
  methods: {
    //Traemos la acción declarada en la tienda
    //Metemos el 'cargarLocalStorage' para que el user que se registre lo vea
    ...mapActions(['setTareas','cargarLocalStorage']),
    //este es cuando presionemos el boton nos lo pinte en la consola
    procesarFormulario(){
      //muy bueno un console para ver si los datos se van a guardar
      console.log(this.tarea)
      //SI FUNCIONA EL CONSOLE PODEMOS HACER UN MÉTODO PARA ENVIAR ESOS DATOS
      // --------------------
      if(this.tarea.nombre.trim() === ""){
        console.log('Campo vacio')
        //Este return hace que se salga de este if
        return
      }
      console.log('No esta vacio')
      //generar id
      //la función generate viene del paquete que instalamos que genera un id aleatorio
      this.tarea.id = shortid.generate()
      console.log(this.tarea.id)
      //enviando los datos
      this.setTareas(this.tarea)
      //-------------------------------------------------------
      //TODO: SI TODO SALE BIEN QUITAMOS LOS CONSOLE ANTERIORES Y MANDAMOS LOS DATOS A UNA BASE DE DATOS O GUARDAMOSç
      //TODO: Y LO PONEMOS EN ESTA PARTE 
      //--------------------------------------------------------
      //Este this.tarea es para que cuando procese los datos al final limpie todos los campos
      //Es como refrescar
      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }

      }
  },
  created(){
    this.cargarLocalStorage()
  }
}
</script>
