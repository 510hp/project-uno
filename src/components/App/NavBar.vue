<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('toggleSideBar')" >
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text">{{data | date('datetime')}}</span>
            </div>

            <ul class="right hide-on-small-and-down">
                <li>
                    <a
                    class="dropdown-trigger black-text"
                    href="#"
                    data-target="dropdown"
                    @click.prevent=""
                    ref="dropdown"
                    >
                        {{userName}}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id='dropdown' class='dropdown-content'>
                        <li>
                            <router-link to="/profile" class="black-text">
                                <i class="material-icons">account_circle</i>Профиль
                            </router-link>
                        </li>
                        <li class="divider" tabindex="-1"></li>
                        <li>
                            <a href="#" class="black-text"
                                @click.prevent="logOut"
                            >
                                <i class="material-icons">assignment_return</i>Выйти
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      data: new Date(),
      interval: null,
      dropdown: null
    }
  },
  methods: {
    async logOut () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    userName () {
      return this.$store.getters.getInfo.name
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.data = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown)
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
