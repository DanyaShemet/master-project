<template>
  <div class="form-emotions"  @click="hideForm">
    <div class="form" @click="(e) => {e.stopPropagation()}">
      <h4>Введите учительский пароль</h4>
      <form @submit.prevent="passwordHandler">
        <input type="password" placeholder="Пароль" v-model="teacherPassword" >
        <button class="close action-button">+</button>
      </form>
      <p class="error" v-if="error">Произошла ошибка</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "CheckForm",
  props: {
    password: {
      type: String,
      required: true,
    }
  },
  emits: ['accept'],
  data(){
    return{
      teacherPassword: '',
      error: false
    }
  },
  methods: {
    passwordHandler(){
      this.teacherPassword === this.password ? this.$emit('accept') : this.error = true
    },
    hideForm(){
      this.$emit('hideForm')
    }
  }
}
</script>

<style scoped>
.close{
  position: initial !important;
}
</style>