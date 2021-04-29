export const actions = {
  nuxtServerInit() {}
}


// import Vue from 'vue'
// import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// // import CreatePersistedState from '~/plugins/storage'
// import { Auth } from 'aws-amplify'

// Vue.use(Vuex)

// const createStore = () =>
//   new Vuex.Store({
//     plugins: [
//       createPersistedState({
//         // storage: window.sessionStorage
//       }),
//     ],
//     state: {   
//       isAuthenticated: false,
//       user : {
//         email : null,
//         jwt : null,
//         isAuthenticated : false
//       },
//     },
//     mutations: {
//       async register(_, { email, password }) {
//         await Auth.signUp({
//           username: email,
//           password,
//         })
//       },

//       async confirmRegistration(_, { email, code }) {
//         await Auth.confirmSignUp(email, code)
//       },

//       async login(state, { email, password }) {
//         state.user.email = email
//         await Auth.signIn(email, password)
//       },

//       async logout(state) {
//         // state.user.isAuthenticated = false
//         state.user.jwt = null
//         state.isAuthenticated = !!null
//         await Auth.signOut()
//       },

//       setJwt(state, { jwt, user }){
//         state.user.jwt = 'Bearer '+ jwt
//         // state.user.isAuthenticated = true
//         state.user.id = user.id
//       },

//       async load(state) {
//         try {
//           const user = await Auth.currentAuthenticatedUser()
//           state.isAuthenticated = true
//           state.user = user
//         } catch (error) {
//           console.log('er ', error);
//           // state.user.isAuthenticated = !!null
//         }
//       },
//     },
//     getters: {
//     },
//   })

// export default createStore
