<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

import EmptyLayout from './layout/EmptyLayout'
import MainLayout from './layout/MainLayout'

export default {
  name: 'App',
  components: {
    EmptyLayout,
    MainLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/materialize-css/dist/css/materialize.min.css';
@import '../src/assets/index.css';
</style>
