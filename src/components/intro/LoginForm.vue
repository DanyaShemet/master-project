<template>
  <div class="popup" @click="hideForm">
    <form @submit.prevent="submitHandler" class="popup__content" @click.stop>
      <h5>Вхід в классний аккаунт</h5>
      <div class="row">
        <div class="input-field  s12">
          <input id="email" type="email"
                 v-model="v$.email.$model"
                 :class="{invalid: v$.email.$errors[0] }"
          >
          <label for="email">Email</label>
          <small class="helper-text invalid" v-for="(error, index) of v$.email.$errors" :key="index">
            <span v-if="error.$message === 'Value is required'">Введите email</span>
            <span v-else-if="error.$message === 'Value is not a valid email address'">Некоректный
            email</span>
          </small>
        </div>
      </div>
      <div class="row">
        <div class="input-field  s12">
          <input id="password" type="password" v-model="v$.password.$model"
                 :class="{invalid: v$.password.$errors[0]}">
          <label for="password">Пароль</label>
          <small class="helper-text invalid" v-for="(error, index) of v$.password.$errors" :key="index">
            <span v-if="error.$message === 'Value is required'">Введите
            пароль</span>
            <span v-else-if="error.$message === 'This field should be at least 8 long'">Минимальная
            длинна {{ error.$params['min'] }} символов. Сейчас - {{ password.length }}</span>
          </small>
        </div>
      </div>

      <button class="log" type="submit">Увійти</button>
      <p class="or">Для індивідуального аккаунту використайте Google</p>
      <button @click="$emit('google')" type="button" class="google">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="20"
             viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
            <g>
              <g id="glass">
                <path
                    d="M286.875,229.5v63.75h150.45c-15.3,89.25-86.7,153-175.95,153c-104.55,0-191.25-86.7-191.25-191.25    s86.7-191.25,191.25-191.25c53.55,0,99.45,22.95,132.6,58.65l45.9-45.9c-45.9-45.9-107.1-76.5-178.5-76.5    c-140.25,0-255,114.75-255,255s114.75,255,255,255s242.25-114.75,242.25-255v-25.5H286.875z"/>
              </g>
            </g>
        </svg>
      </button>
    </form>
  </div>
</template>
<script>

import {email, required, minLength} from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    return {v$: useVuelidate()}
  },
  name: 'login',
  emits: ['hide', 'google'],
  data: () => ({
    email: '',
    password: '',
  }),
  validations() {
    return {
      email: {required, email},
      password: {required, minLength: minLength(8)},
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/check')
      } catch (e) {
      }

    },
    hideForm() {
      this.$emit('hide', 'true')
    }


  },
  mounted() {

  },

}

</script>

<style lang="scss">


</style>