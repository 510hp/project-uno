<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{getInfo.bill | currencyFilter('RUB')}}</h4>
    </div>

    <TheLoader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет
      <router-link to="/categories">Добавить категорию</router-link>
    </p>

    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currencyFilter('RUB')}} из {{category.limit | currencyFilter('RUB')}}
        </p>
        <div class="progress" v-tooltip="category.tooltipText">
          <div class="determinate"
               :class="[category.progressColor]"
               :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SideBar from "../components/App/SideBar";
import NavBar from "../components/App/NavBar";
import messages from "../utils/messages";
import {mapGetters} from "vuex";
import currencyFilter from '../filters/currency.filter'

export default {
  name: "ThePlanning",
  components: {
    SideBar,
    NavBar
  },
  data() {
    return {
      loading: true,
      categories: []
    };
  },
  computed: {
    ...mapGetters([
      'getInfo'
    ]),
  },
  watch: {},
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map(category => {
      const spend = records
        .filter(record => record.categoryId === category.id)
        .filter(record => record.type === 'outcome')
        .reduce((total, rec) => {
          return total += +rec.amount
        }, 0)

      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = category.limit - spend;
      const tooltipText = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;
      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltipText
      }
    });

    this.loading = false;
  }
};
</script>
