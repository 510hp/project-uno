// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import messagePlugin from './utils/message.plugin'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store'

import dateFilter from './filters/data.filters'
import currencyFilter from './filters/currency.filter'
import TheLoader from './components/App/TheLoader'
import tooltipDirective from './directives/tooltip.directive'

import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

Vue.filter('date', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.directive('tooltip', tooltipDirective)

const firebaseConfig = {
  apiKey: 'AIzaSyCeAG7okQaMevcSEHHofV9K7xZMPuXzBCU',
  authDomain: 'vue-learn-base.firebaseapp.com',
  databaseURL: 'https://vue-learn-base.firebaseio.com',
  projectId: 'vue-learn-base',
  storageBucket: 'vue-learn-base.appspot.com',
  messagingSenderId: '282844829979',
  appId: '1:282844829979:web:5aecf6e6dfa6fbfa171bbe',
  measurementId: 'G-EDN1BMZY7V'
}

firebase.initializeApp(firebaseConfig)

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(Vuex)
Vue.component('TheLoader', TheLoader)

Vue.config.productionTip = false

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})
