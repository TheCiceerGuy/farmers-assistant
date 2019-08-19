import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import AlertCmp from './views/Shared/Alert.vue'
import router from './router'
import EditEntryDetialsDialog from './views/edit/EditEntryDetailsDialog.vue'
import DateFilter from './filters/date'
import {
  store
} from './store'

import Vuetify from 'vuetify';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#26A69A',
    success: '#3cd1c2',
    info: '#ffaa2c',
    error: '#f83e70',
    secondary: '#7CB342',

  }
})
Vue.config.productionTip = false
Vue.filter('date', DateFilter)

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-entry-details-dialog', EditEntryDetialsDialog)


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDHXhrS500XFmRLvY1PexV3hRIhcDdbyK0',
      authDomain: 'farmers-assistant.firebaseapp.com',
      databaseURL: 'https://farmers-assistant.firebaseio.com',
      projectId: 'farmers-assistant',
      storageBucket: ''
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadEntrys')
  }
}).$mount('#app')