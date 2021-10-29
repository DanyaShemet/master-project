<template>
  <div class="form" @click="(e) => {e.stopPropagation()}">
    <h4>{{text}}</h4>

    <form @submit.prevent="submitHandler">
      <label>Введите кол-во эмоций</label>
      <input type="number" placeholder="" v-model.number="number" max="7" min="-7" >
      <p>Выберите категорию</p>
      <div class="record-icons">
        <button type="button" class="record-icon" v-for="icon in categories" @click="chooseIcon " :ref="buttons"
                :id="icon.id">
          <i class="material-icons">{{ icon.icon }}</i>
          <span class="icon-text">{{ icon.title }}</span>
        </button>
      </div>
      <button class="plus-record action-button">+</button>
    </form>
    <p v-if="isError" class="error">Напишите количество эмоций и выбери иконку</p>
    <Loader v-if="addDeleteLoading"/>
    <button @click="this.$emit('hideForm')" class="close action-button">-</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    refsButtons: [],
    number: 0,
    chosenIcon: null,
    isError: false
  }),
  props: {
    categories: {
      type: Object
    },
    addDeleteLoading: {
      type: Boolean
    },
    text: String,
    type: String
  },
  emits: ['submit', 'hideForm'],
  methods: {
    chooseIcon(e) {
      this.refsButtons.forEach(el => el.classList.remove('selected'))
      e.target.classList.add('selected')
      this.chosenIcon = e.target.id
    },
    buttons(el){
      this.refsButtons.push(el)
    },
    submitHandler(){
      if (!this.chosenIcon || +this.number <= 0) {
        this.isError = true
        return
      }
      const record = {
        categoryId: this.chosenIcon,
        countEmotions: +this.number,
        date: new Date().toJSON()
      }
      this.$emit('submit', {record, type: this.type})
    }
  },
  beforeUpdate() {
    this.refsButtons = [] // reset empty before each update
  },

}
</script>