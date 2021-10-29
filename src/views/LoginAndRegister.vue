<template>
  <div>
    <header>
      <h1>Аналізуй не аналізуєме</h1>
      <ButtonsLog @google="googleHandler" :isShowForm="isShowForm" @hideFormToButtons="hideForm"/>
    </header>
    <section class="content">
      <img src="../assets/emotionally-stable.png" alt="">
      <p>Вітаю тебе на сторінці оцінки емоціної складової в классі. </p>
      <p>Перед початком ознайомтеся з правилами <span @click="showInstruction">тут</span></p>
    </section>
    <button @click="showForm" class="start-btn">Увійти в аккаунт</button>
    <div class="popup" v-if="isShowInstruction" @click="showInstruction">
      <div @click.stop class="popup__content">
        <h6 class="bold">ДЛЯ УЧНІВ</h6>
        <p>Після того як ви зайдете в обліковий аккаунт класу, вам буде доступно додавання або віднімання емоцій в конкретну категорію.
          Про критерії оцінювання читайте в
          <span>КРИТЕРІЇ ОЦІНКИ</span> нижче</p>
        <h6  class="bold">ДЛЯ ВЧИТЕЛІВ</h6>
        <p>Після того як ви зайдете в обліковий аккаунт класу, ви зможете створити категорії для оцінки емоційної
          складової колективу. На сторінці КАТЕГОРІЇ вам буде доступна форма для цього.</p>
        <p>Після створення категорій учні зможуть побачити їх на сторінці ГОЛОВНА при додаванні або відніманні емоції</p>
        <h6 class="bold">ДЛЯ ІНДИВІДУАЛЬНОГО ВИКОРИСТАННЯ</h6>
        <p>Якщо ви бажаєте використовувати додаток в особистому житті, авторизуйтеся в додаток через <span>Google</span></p>
        <h6  class="bold">ОСНОВНІ ПОЛОЖЕННЯ</h6>
        <p>1. Додавати, змінювати, видаляти категорії може лише викладач</p>
        <p>2. Переглядати, видаляти записи може лише викладач </p>
        <p>3. Додавати записи може лише учень</p>
        <p>4. Классний аккаунт створюється за допомогою пошти і паролю</p>
        <p>5. Особисті аккаунти сторюються за допомогою авторизації через <span>Google</span></p>
        <h6  class="bold">КРИТЕРІЇ ОЦІНКИ</h6>
        <p>1. Максимальна позитивна оцінка для однієї категорії: <span>7</span></p>
        <p class="mb-2">2. Максимальна негативна оцінка для однієї категорії: <span>-7</span></p>
        <button class="start-btn" @click="showInstruction">Все зрозуміло</button>
      </div>

    </div>
  </div>

</template>

<script>
import ButtonsLog from '@/components/intro/ButtonsLog'
import Faces from '@/components/intro/Faces'
import messages from "../utils/messages";
import firebase from "firebase/app";

export default {
  name: 'home',
  data: () => ({
    isShowForm: false,
    isShowInstruction: false
  }),
  components: {
    ButtonsLog, Faces
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  methods: {
    async googleHandler() {
      let provider = new firebase.auth.GoogleAuthProvider();
      let isAuthentication = false;
      try {
        let result = await firebase.auth().signInWithPopup(provider)
        var token = result.credential.accessToken;
        var user = result.user;
        isAuthentication = true
        let formDataGoogle = {
          email: user.email,
          password: user.uid,
          name: user.displayName
        }
        await this.$store.dispatch('loginGoogleUser', formDataGoogle)
        this.$router.push({
          name: 'main',
          params: {status: 'ind'}
        })

      } catch (e) {
      }
    },
    showForm() {
      this.isShowForm = true
    },
    showInstruction() {
      this.isShowInstruction = !this.isShowInstruction
    },
    hideForm() {
      this.isShowForm = false
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Щось пішло не так')
    }
  }
}
</script>

<style lang="scss">
.mb-2{
  margin-bottom: 20px;
}
.bold{
  font-weight: bold;
}
p span{
  font-weight: bold;
}
header {
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  h1 {
    margin: 0;
    font-size: 50px;
    font-weight: 600;
  }

  button {
    font-size: 16px;
    font-weight: 300;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    margin: 0 5px;
    transition: all .3s;

    &:focus {
      background-color: initial;
    }

    &:hover {
      border-bottom: 1px solid #ccc;
    }
  }
}

.content {
  width: 90%;
  margin: 60px auto 60px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 20px;

    span {
      color: #FF8C00;
      cursor: pointer;
    }
  }

  img {
    max-width: 100%;
    width: 300px;
    margin-bottom: 20px;
  }

}

.start-btn {
  display: block;
  margin: 0 auto;
  border: 2px solid #000;
  font-weight: 600;
  font-size: 30px;
  padding: 16px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    color: #fff;
    background-color: #000;
  }
}

@media screen and (max-width: 768px) {
  header {
    flex-direction: column;

    h1 {
      margin-bottom: 30px;
      font-size: 40px;
    }
  }
  .content {
    width: 95%;
    margin: 20px auto 20px auto;

    p {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 10px;
    }
  }
  .start-btn {
    font-size: 18px;
    padding: 10px 12px;
    border-radius: 10px;

    &:hover {
      color: #fff;
      background-color: #000;
    }
  }
}

@media screen and (max-width: 550px) {
  header {
    h1 {
      margin-bottom: 20px;
      font-size: 25px;
    }
  }
}
</style>
