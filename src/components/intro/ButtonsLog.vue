<template>
  <div>
    <button @click="loginHandler('log')">Войти</button>
    <button @click="loginHandler('reg')">Регистрация</button>
    <LoginForm v-if="isLoginForm" @hide="hideForm" @google="$emit('google')"/>
    <RegisterForm v-if="isRegisterForm || isShowForm" @hide="hideForm" @google="$emit('google')"/>
  </div>
</template>


<script>
import LoginForm from "@/components/intro/LoginForm";
import RegisterForm from "@/components/intro/RegisterForm";

export default {
  name: 'buttons',
  props: ['isShowForm'],
  data: () => ({
    isLoginForm: false,
    isRegisterForm: false,
  }),
  components: {
    LoginForm, RegisterForm
  },
  methods: {
    loginHandler(e) {
      if (e === 'log') {
        this.isLoginForm = true
        this.isRegisterForm = false
      }
      if (e === 'reg') {
        this.isRegisterForm = true
        this.isLoginForm = false
      }

    },
    hideForm() {
      this.isLoginForm = false
      this.isRegisterForm = false
      this.$emit('hideFormToButtons')
    },
  },
}

</script>


<style lang="scss">
button.log {
  margin-bottom: 5px !important;
}

button.google {
  width: 40px !important;
}

.or {
  text-align: center;
  margin: 5px 0;
  color: #c0c0c0;
  font-size: 25px;
  font-weight: 700;
  padding: 5px 0;
}

.form-home {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 40%;
    background-color: #fff;
    border: 3px solid #000;
    border-radius: 10px;
    padding: 15px;

    h5 {
      font-weight: 600;
      margin-bottom: 20px;
      text-align: center;
    }

    button {
      border: 2px solid #000;
      font-weight: 600;
      font-size: 18px;
      border-radius: 10px;
      width: 200px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;

      &:hover {
        width: 220px;
        border: 2px solid #000;
      }
    }

    label {
      color: #000;

      &.active {
        color: #c0c0c0 !important;
      }
    }

    small {
      color: #C10E0E !important;
    }
  }
}

@media screen and (max-width: 768px){
  .form-home {
    form {
      width: 60%;
    }
  }
}

@media screen and (max-width: 550px){
  .form-home {
    form {
      width: 80%;
    }
  }
}

</style>