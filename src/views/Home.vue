<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh()">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <TheLoader v-if="loading"/>

    <div v-else class="row">

      <HomeBill
        :rates=currency.rates
      />

      <HomeCurrency
        :rates=currency.rates
        :date=currency.date
      />

    </div>
  </div>
</template>

<script>

import HomeBill from '../components/HomeBill'
import HomeCurrency from '../components/HomeCurrency'

export default {
  name: 'Home',
  components: {
    HomeBill,
    HomeCurrency
  },
  data () {
    return {
      loading: true,
      currency: null
    }
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
