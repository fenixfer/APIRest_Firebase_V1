import { createStore } from 'vuex'
//Para que regrese a la página de inicio utilizamos el router entonces aqui lo llamamos
import router from '../router/index' 
//Con esto empujamos a actualizar en la pagina de inicio en la mutación

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
    //El usuaruio no existe
    user: null,
    //Este es el error por ingresar si esta mal sus credenciales o si no esta registrado
    error: {
      tipo: null, mensaje: null
    }
  },
  mutations: {
    setError(state, payload){
      //Si no hay errores entonces que retorne el objeto
      if(payload === null){
        return state.error = {tipo: null, mensaje: null}
      }
      //El eamil_not_found viene de la respuesta de firebase cuando alguien intenta entrar pero no esta registrado en el que pone en el console
      if(payload === 'EMAIL_NOT_FOUND'){
        //Y este lo pintamos en una alerta en Ingreso.vue
        return state.error = {tipo: 'email', mensaje: 'El email no esta registrado.'}
      }
      //Lo mismo pero con la contraseña
      if(payload === 'INVALID_PASSWORD'){
        //Y este lo pintamos en una alerta en Ingreso.vue
        return state.error = {tipo: 'password', mensaje: 'El password es incorrecto.'}
      }
      if(payload === 'EMAIL_EXISTS'){
        //Y este lo pintamos en una alerta en Ingreso.vue
        return state.error = {tipo: 'email', mensaje: 'El email ya esta registrado.'}
      }
      if(payload === 'INVALID_EMAIL'){
        //Y este lo pintamos en una alerta en Ingreso.vue
        return state.error = {tipo: 'email', mensaje: 'El email es incorrecto.'}
      }
    },
    setUser(state, payload){
      state.user = payload
    },
    //LO DEL LOCAL STORAGE
    cargar(state,payload) {
      state.tareas = payload
    },
    //recibe lo de la actions setTarea
    //El payload es el de la tarea
    set(state, payload){
      //empujamos
      //hacemos esto para que emuje los datos introducidos al hombe y los guarde allà 
      state.tareas.push(payload)
      //ponemos console para ver si se esta empujando
      //console.log(state.tareas)
      //para guuardar se empuja 

    },
    //tramos lo de la actions
    delete(state, payload){
      //Utilizamos filter de javascript 
      state.tareas = state.tareas.filter( item => item.id !== payload)
    },
    tarea(state,payload){
      //Si el usuario pone un id para editar en la url aparecera una página con datos pero no queremos que vea eso
      //Entonces si no encuenta eso de cierto id que lo mande a la página de inicio
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/')
        return //Este return hace que se salga del ciclo y avance
      }
      //la función find es de javascript que busca algo en el array
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    actualizar(state,payload){
      //la funcón map() también es de javascript y devuelve un array con una condición que nosotros queramos
      //SI ENCUENTRA ESA CONICIDENCIA ENTONCES DEVUELVE LO QUE VA DESPUÉS DEL ?
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)  
      //Con esto empujamos  al usuario en la página de inicio
      router.push('/')
    }
  },
  actions: {
    //Lo mandamos a la pantalla de ingreso y lo mapeamos
    cerrarSesion({commit}){
      commit('setUser', null)
      router.push('/ingreso')
      //Aqui también, pasamos el usuario declarado en el ingreso de del usuario o del registro
      //Y para cuando cierre sesión no le quede datos ahi en el localstorage
      localStorage.removeItem('usuario')
    },
    async ingresoUsuario({commit}, usuario ) {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAq4Tgi3imCetP2iXYlOSuUeP7AxN09nE',{
          method: 'POST',
          body: JSON.stringify({
            //Esto de la guía de API REST FIREBASE
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        //console.log('userDB', userDB)
        //Si devuelve un error si no es valida su contraseña o email
        if (userDB.error) {
          //el console iba abajo pero necesitamos mandarle mensaje al usario de que no esta registrado
          console.log(userDB.error)
          //Este setError lo mandamos a las mutaciones
          return commit('setError', userDB.error.message)
        }
        commit('setUser', userDB)
        //Si el usuario esta introduciendo información verdadera ya no queremos que pinte el error entocnes se hace:
        //Ponemos el null porque no existen errores
        commit('setError', null)
        //empujamos al usuario a la raiz o la del CRUD  
        router.push('/')
        //Tenemos que guardar la sesión en el localstorage para que cuando refreseque no desaparezca la información
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },
    async registrarUsuario({commit}, usuario){
      try {
        //Esta de url es de firebase de autenticacón de usuario y password
        //Donde iba la API KEY era la que genera firebase es la pública
        //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAq4Tgi3imCetP2iXYlOSuUeP7AxN09nE',{
          method: 'POST',
          body: JSON.stringify({
            //usuario.email
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        //HABILITAR LA AUTENTICACIÓN DE EMAIL EN FIREBASE
        //console.log(userDB)
        if (userDB.error) {
          //el console iba abajo pero necesitamos mandarle mensaje al usario de que no esta registrado
          console.log(userDB.error)
          //Este setError lo mandamos a las mutaciones
          return commit('setError', userDB.error.message)
        }
         commit('setUser', userDB)
         commit('setError', null)
        //empujamos al usuario a la raiz o la del CRUD  
        router.push('/')
        //Aqui también como en el ingreso usuario debemos matener la información aunque refresquemos
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },
    //ASYNC Y AWAIT CUANDO HACEMOS PETICIONES AL SERVIDOR
    //Este cargar datos debe de llamarse LeerDatos pero lo dejamos asi
    //Aqui consumimos la API de Firebase, leemos los datos o traemos lo datos de la base de datos hecha en Firebase
    //ESTA STATE DESPUÉS DE LA AUTENTICACIÓN DEBEMOS DE PONERLO EN TODOS LOS COMMITS
    async cargarLocalStorage({ commit, state  }) {
      //Este cargarLocalStorage esta en el App.vue entonces se hace unas validaciones
      //getItem es el usuario
      //Leemos si existe el usuario entonces puede meter
      //ESTO ES IMPORTANTE PORQUE SI NO EXISTE EL USUARIO ENTONCES NO HACEMOS SOLICITUD A LA BASE DE DATOS SI EL USUARIO NO EXISTE
      if(localStorage.getItem('usuario')){
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      }else {
        //Si no existe el usuario o esta en null lo mandamos a ingreso eso esta declarado en el router
        return commit('setUser', null)
      }
      //LEER LA INFORMACIÓN DE LA BASE DE DATOS
      try {
        //METEMOS QUE EL USUARIO LEA EL DOC CON EL TOKEN
        //Es un token dinámico entonces ponemos comillas invertidas
        //state.user.idYoken es de la guía Firebase
        const res = await fetch(`https://api-firebase-54afd-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        //console.log(dataDB)
        const arrayTareas = []
  
        //Para leer aqui recorremos el arreglos
        for (let id in dataDB){
          //empuja la tarea en individual
          arrayTareas.push(dataDB[id])
        }
        //console.log(arrayTareas)
        commit('cargar', arrayTareas)
        
    } catch (error) {
      console.log(error)
    }
    },
    //Async y Await es como pedir petición al servidor
    async setTareas({commit, state}, tarea){
      try {
        //tareas.json crea como
        //El await dice que espera la petición
        //La url necesita crear un documento en la base de datos y ponemos un nombre en ña url al ultimo que lleve .json
        //fetch recibe un objeto que va después de la url
        //PARA RECIBIR RESPUESTA DECLARAMOS UNA CONSTANTE PARA QUE LO GUARDE Y LA IMPRIMIMOS EN CONSOLE PARA PROBAR
        //SE PONIA COMILLAS SIMPRES PERO COMO NECESITAMOS QUE GUARDE POR ID LA PONEMOS EN LA URL CON COMILLAS INVERTIDAS PARA QUE PASEMOS tarea.id
        const res = await fetch(`https://api-firebase-54afd-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          //necesitamos un método utilizamos GET ES POR DEFECTO pero en realidad es PUT 
          method: 'PUT',
          //EL POST DA UN ID ALEATORIO Y ORDENA MEJOR LA INFORMACÓN PERO NOSOTROS YA HABIAMOS GENERADO UN ID ASI QUE AQUÍ SERIA REDUNDANTE 
          headers: {
            //Es la cabecera y siempre va asi (es opcional) pero siempre hay que ponerla
            //Solo que los datos que van a viajar en json
            'Content-Type': 'application/json'
          },
          //mandamos la tarea de setTareas pero no asi lo mandamos con body
          body: JSON.stringify(tarea)
        })
        //Recibimos lo que viene en json
        const dataDB = await res.json()
        //IMPRIMIMOS EN UN CONSOLE LA VARIABLE dataDB PARA VER SI FUNCIONA
        console.log(dataDB)
      } catch (error) {
        console.log(error)
      }
      commit('set', tarea)
    },
    //Para el botón eliminar y ese id es de la tarea lo necesitamos
    async deleteTareas({commit, state}, id){
      try {
        await fetch(`https://api-firebase-54afd-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
        method: 'DELETE', 
      })
      } catch (error) {
        console.log(error)
      }
      //Este commit es de la lista o tabla de tareas
      commit('delete', id)
    },
    //En id es el mismo que obtenemos de la url
    obtenerTarea({commit}, id){
      commit('tarea', id)
    },
    //la acción o método para actualizar 
    async actualizarTarea({commit, state}, tarea){
      try {
        const res = await fetch(`https://api-firebase-54afd-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
      const dataDB = await res.json()
      //console.log(dataDB)
      commit('actualizar', dataDB)
      } catch (error) {
        console.log(error)
      }
    }
  },
  //Getters retorna valor del state
  getters: {
    usuarioAutenticado(state){
      //Si existe el usuario retorna un true y si no existe retorna un falses
      return !!state.user
    }
  },
  modules: {
  }
})