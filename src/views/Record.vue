<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <TheLoader v-if="loading" />

        <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить категорию</router-link></p>

        <form v-else class="form" @submit.prevent="submitForm">
            <div class="input-field" >
                <select ref="select" v-model="category">
                    <option v-for="item in categories"
                    :key="item.id"
                    :value="item.id"
                    >{{item.title}}</option>
                </select>
                <label>Выберите категорию</label>
            </div>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="income"
                        v-model="type"
                    />
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="outcome"
                        v-model="type"
                    />
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input
                    id="amount"
                    type="number"
                    v-model="amount"
                    :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"

                >
                <label for="amount">Сумма</label>
                <span
                    v-if="$v.amount.$dirty && !$v.amount.minValue"
                    class="helper-text invalid"
                >Минимальное значение {{$v.amount.$params.minValue.min}}</span>
            </div>

            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="description"
                    :class="{invalid: $v.description.$dirty && !$v.description.required}"

                >
                <label for="description">Описание</label>
                <span
                    v-if="$v.description.$dirty && !$v.description.required"
                    class="helper-text invalid">Введите описание</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>
<script>

import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  name: 'TheRecord',
  components: {
  },
  data () {
    return {
      categories: [],
      loading: true,
      select: null,
      category: null,
      type: 'income',
      amount: 1,
      description: ''
    }
  },
  validations: {
    description: {required},
    amount: {minValue: minValue(1)}
  },
  computed: {
    ...mapGetters(['getInfo']),
    canCreatRecord () {
      if (this.type === 'income') {
        return true
      }

      return this.getInfo.bill >= this.amount
    }
  },
  methods: {
    async submitForm () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreatRecord) {
        try {
          await this.$store.dispatch('creatRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income'
            ? this.getInfo.bill + this.amount
            : this.getInfo.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {
          console.log('error', error)
          throw error
        }
      } else {
        console.log('getInfo', this.getInfo)
        this.$message(`Недостаточно средст (${this.amount - this.getInfo.bill})`)
      }
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)

    if (this.categories.length) {
      this.category = this.categories[0].id
    }
  },
  beforeDestroy () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
