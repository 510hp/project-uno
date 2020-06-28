<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <TheLoader v-if="loading" />
            <div v-else class="row">
                <div class="col s12 m6">
                    <CategoryCreat
                        @created="addNewCategory"
                    />
                </div>
                <div class="col s12 m6">
                    <CategoryEdit
                      v-if="categories.length"
                      :categories="categories"
                      @update="categoriesUpdate"
                      :key="categories.length + updateCount"
                    />
                    <p class="center">Категорий нет</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreat from '../components/CategoryCreat'
import CategoryEdit from '../components/CategoryEdit'

export default {
  name: 'TheCategories',
  components: {
    CategoryCreat,
    CategoryEdit
  },
  data () {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  methods: {
    addNewCategory (category) {
      console.log('category', category)

      this.categories.push(category)
    },
    categoriesUpdate (category) {
      const index = this.categories.findIndex(item => item.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    console.log('this.categories', this.categories)
    this.loading = false
  }
}
</script>
