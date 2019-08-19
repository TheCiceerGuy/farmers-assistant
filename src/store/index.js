import Vue from "vue"
import Vuex from "vuex"
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedEntrys: [{
        id: "1",
        title: "Fresh Cauliflower on Sale",
        description: "The cailiflower is very smooth and healthy, we can have it any where.",
        by: "Ram Parsad",
        date: new Date(),
        status: "Instock",
        price: "Rs.500/kg",
        image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        location: "Manamaiju"
      },
      {
        id: "2",
        title: "Fresh Cabbage on Sale",
        description: "The cailiflower is very smooth and healthy, we can have it any where.",
        by: "Apil",
        date: new Date(),
        status: "Outstock",
        price: "Rs.500/kg",
        image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        location: "Manamaiju"
      },
      {
        id: "3",
        title: "Fresh Fish on Sale",
        description: "The cailiflower is very smooth and healthy, we can have it any where.",
        by: "Gopal",
        date: new Date(),
        status: "Instock",
        price: "Rs.500/kg",
        image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        location: "Manamaiju"
      },
      {
        id: "4",
        title: "Fresh Tomatoes on Sale",
        description: "The cailiflower is very smooth and healthy, we can have it any where.",
        by: "Mishan",
        date: new Date(),
        status: "Outstock",
        price: "Rs.500/kg",
        image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        location: "Manamaiju"
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedEntrys(state, payload) {
      state.loadedEntrys = payload
    },
    farmersEntry(state, payload) {
      state.loadedEntrys.push(payload)
    },
    updateEntry(state, payload) {
      const entrys = state.loadedEntrys.find(entrys => {
        return entrys.id === payload.id
      })
      if (payload.title) {
        entrys.title = payload.title
      }
      if (payload.description) {
        entrys.description = payload.description
      }
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }


  },
  actions: {
    loadEntrys({
      commit
    }) {
      commit('setLoading', true)
      firebase.database().ref('entry').once('value')
        .then((data) => {
          const entry = []
          const obj = data.val()
          for (let key in obj) {
            entry.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              status: obj[key].status,
              price: obj[key].price,
              image: obj[key].image,
              location: obj[key].location,
              phone: obj[key].phone,
              date: obj[key].date,
              creatorId: obj[key].creatorId

            })
          }
          commit('setLoading', false)
          commit('setLoadedEntrys', entry)

        })

        .catch((error) => {
          console.log(error)
          commit('setLoading', true)
        })
    },


    farmersEntry({
      commit,
      getters
    }, payload) {
      const entrys = {
        title: payload.title,
        description: payload.description,
        status: payload.status,
        price: payload.price,
        image: payload.image,
        date: payload.date.toISOString(),
        location: payload.location,
        phone: payload.phone,
        creatorId: getters.user.id

      }

      firebase.database().ref('entry').push(entrys)
        .then((data) => {
          const key = data.key
          commit('farmersEntry', {
            ...entrys,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      //Reachup to firebase and store it.

    },
    updateEntryData({
      commit
    }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      firebase.database().ref('entry').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateEntry', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })

    },
    signUserUp({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredEntrys: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)

          }
        )

    },
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {

              id: user.uid,
              registeredEntrys: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)

          }
        )

    },

    autoSignIn({
      commit
    }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredEntrys: []
      })
    },
    logout({
      commit

    }) {
      firebase.auth().signOut()
      commit('setUser', null)

    },
    clearError({
      commit
    }) {
      commit('clearError')
    }
  },
  getters: {
    loadedEntrys(state) {
      return state.loadedEntrys.sort((entryA, entryB) => {
        return entryA.date > entryB.date;
      });
    },
    featuredEntry(state, getters) {
      return getters.loadedEntrys.slice(0, 5)
    },
    loadedSingleEntry(state) {
      return entryId => {
        return state.loadedEntrys.find((entry) => {
          return entry.id === entryId;
        });
      };
    },
    user(state) {
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
});