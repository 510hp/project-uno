<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Счет в валюте</span>

                <p v-for="cur in currencies"
                    :key="cur"
                    class="currency-line"
                >
                <span>{{getCurrency(cur) | currencyFilter(cur)}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HomeBill',
  props: ['rates'],
  data () {
    return {
      currencies: [
        'RUB',
        'USD',
        'EUR'
      ]
    }
  },
  computed: {
    base () {
      return this.$store.getters.getInfo.bill / (this.rates['RUB']) / this.rates['EUR']
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
