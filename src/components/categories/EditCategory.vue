<template>
  <div class="edit-category" ref="edit">
    <h4>Редактирование категории {{ $props.category.title }} <i class="material-icons">{{
        $props.category.icon
      }}</i>
    </h4>
    <Loader v-if="loading" style="margin-top: 20px"/>
    <form @submit.prevent="updateCategory" v-else>
      <input type="text" placeholder="Введите новое название категории"
             v-model="v$.title.$model"
             :class="{invalid: v$.title.$errors[0] }">
      <h5>Выберите новую иконку</h5>
      <div class="category-buttons">

        <button class="icon-item selected active" ref="buttons" type="button" :id="$props.category.icon"
                @click="chooseIcon"><i class="material-icons">{{ $props.category.icon }}</i></button>
        <button class="icon-item" :ref="buttons" type="button" @click="chooseIcon" v-for="icon in icons" :id="icon">
          <i class="material-icons">{{ icon }}</i>
          <span v-if="$props.category.icon === icon">В</span>
        </button>
      </div>


      <button class="plus-category action-emotion" :disabled="loading">+</button>
    </form>

    <p v-if="isCopy" class="error">Категория с таким именем уже есть, не стоит ее дублировать</p>
    <div  v-for="(error, index) of v$.title.$errors" :key="index">
      <p class="error" v-if="error.$message === 'Value is required'">Введите название категории</p>
      <p class="error" v-if="error.$message === 'This field should be at least 2 long'">Название категории слишком короткое, минимум 2 символа</p>
      <p class="error" v-if="error.$message === 'The maximum length allowed is 15'">Название категории слишком длинное, максимум 15 символов</p>
    </div>

  </div>
</template>

<script>
import {required, minLength, maxLength} from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";


export default {
  setup() {
    return {v$: useVuelidate()}
  },
  props: ['category', 'icons', 'categories'],
  data: () => ({
    chosenIcon: '',
    isError: null,
    isCopy: null,
    title: '',
    loading: false,
    refsButtons: []
  }),
  validations() {
    return {
      title: {required, minLength: minLength(2), maxLength: maxLength(15)},
    }
  },
  methods: {
    async updateCategory() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      for (let category of this.categories) {
        if (category.title.trim().toLowerCase() === this.title.trim().toLowerCase() && category.id !== this.category.id) {
          this.isCopy = true
          return
        }
        this.isCopy = false
      }


      try {
        if (!this.isCopy) {
          this.loading = true
          const formData = {
            id: this.category.id,
            title: this.title,
            icon: this.chosenIcon || this.category.icon
          }
          await this.$store.dispatch('updateCategory', formData)
          this.$message('Категория успешно обновлена')
          this.loading = false
          this.$emit('updated', formData)
        }
      } catch (e) {
      }
    },
    getTitle() {
      this.title = this.category.title
    },
    chooseIcon(e) {
      // e.path[1].children.forEach(el => el.classList.remove('selected'))
      this.refsButtons.forEach(el => el.classList.remove('selected'))
      e.target.classList.add('selected')
      this.chosenIcon = e.target.id
    },
    buttons(el){
      this.refsButtons.push(el)
    }
  },
  beforeUpdate() {
    this.refsButtons = [] // reset empty before each update
  },
  mounted() {
    this.loading = true
    this.getTitle()
    window.scrollBy({
      top: this.$refs.edit.getBoundingClientRect().top,
      behavior: 'smooth'
    })
    this.loading = false

  },

}
</script>

<style scoped lang="scss">
h4 {
  font-size: 20px;
  text-align: left;
  font-weight: 500;
  margin-bottom: 0;
}

h5 {
  font-weight: 400;
  font-size: 15px;
}

input {
  border-bottom: 2px solid #000 !important;
  font-weight: 500;
  font-size: 18px;

  &::placeholder {
    font-weight: 400;
  }
}

.plus-category {
  display: block;
  margin: 0 auto;
}

.plus-category {
  border: 1px solid #000 !important;
  width: 38px;
  height: 38px;
  font-size: 18px;

  &:focus {
    background-color: #fff;
  }
}

@media screen and (max-width: 768px) {
  .edit-category {
    padding-bottom: 120px;
  }
}
</style>