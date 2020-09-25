 <template>
     <div class="app-main-layout">

         <NavBar
            @toggleSideBar="SideBarOpen = !SideBarOpen"
         />

         <SideBar
            v-model="SideBarOpen"
         />

         <main class="app-content"
            :class="{full: !SideBarOpen}"
         >
             <div class="app-page">
                 <router-view/>
             </div>
         </main>

         <div class="fixed-action-btn">
             <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
                 <i class="large material-icons">add</i>
             </router-link>
         </div>
     </div>
</template>

<script>

import SideBar from '../components/App/SideBar'
import NavBar from '../components/App/NavBar'
import messages from '../utils/messages'

export default {
  name: 'App',
  components: {
    SideBar,
    NavBar
  },
  data () {
    return {
      SideBarOpen: true
    }
  },
  computed: {
    error () {
      return this.$store.getters.getError
    }
  },
  watch: {
    error (fbError) {
      console.log('fbError', fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.getInfo).length) {
      await this.$store.dispatch('fetchInfo')
    }
  }
}
</script>
