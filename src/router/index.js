import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
//Importamos la tienda para el getters para autenticación
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    //le podemos agregar un meta el nombre es cualquiera
    //EL META ES PARA TENER LA RUTA PROTEGIDA
    meta: {rutaProtegida: true}
  },
  {
    // El :id será dinámico captura un id dinámico (Es el que se va a editar)
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue'),
    //Agremaos también una ruta protegida
    meta: {rutaProtegida: true}
  },
  {
    // El :id será dinámico captura un id dinámico (Es el que se va a editar)
    path: "/registro",
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue'),
    //Agregar también otra ruta protegida 
    //meta: {rutaProtegida: true}
  },
  {
    // El :id será dinámico captura un id dinámico (Es el que se va a editar)
    path: "/ingreso",
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//Necesitamos leer esas rutas protegidas entonces ponemos un forEach(documentación Navigation Guards)
//El to es para poder acceder al meta, el next dice si el esta registrado el usuario entonces que acceda a esa ruta
//EL  beforeEach hace un recorrido por todas las rutas 
router.beforeEach((to,from,next) => {
  //console.log(to.meta.rutaProtegida)
  //si existe esa ruta protegida 
  //traemos el index de la tienda

  if (to.meta.rutaProtegida) {
    //Si existe ese usuario se hace un check y que ingrese a esa ruta
    if (store.getters.usuarioAutenticado) {
      next()
      //Si no lo mandamos al ingreso
    }else {
      next('/ingreso')
    }
  }else {
    next()
  }
})

export default router
