<template>
  <div>
    <header>
      <h1>Аналізуй не аналізуєме</h1>
      <ButtonsLog @google="googleHandler" :isShowForm="isShowForm" @hideFormToButtons="hideForm"/>
    </header>
<!--    <section class="content">-->
<!--      <p>Сам решаешь как считать свои эмоции</p>-->
<!--      <p>Сам решаешь сколько эмоций потратил</p>-->
<!--      <p>Сам решаешь сколько эмоций получил</p>-->
<!--    </section>-->
    <button @click="showForm" class="start-btn">Спробувати</button>
<!--    <Faces />-->
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
    isShowForm: false
  }),
  components: {
    ButtonsLog,Faces
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
        this.$router.push('/main')

      } catch (e) {}
    },
    showForm(){
      this.isShowForm = true
    },
    hideForm(){
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
      this.$error(messages[fbError.code] || 'Что то пошло не так')
    }
  }
}
</script>

<style lang="scss">
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

.content{
  width: 90%;
  margin: 60px auto 60px auto;

  p{
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 20px;
  }
}
.start-btn{
  display: block;
  margin: 0 auto;
  border: 2px solid #000;
  font-weight: 600;
  font-size: 30px;
  padding: 16px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all .3s;
  &:hover{
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
  .content{
    width: 95%;
    margin: 20px auto 20px auto;

    p{
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 10px;
    }
  }
  .start-btn{
    font-size: 18px;
    padding: 10px 12px;
    border-radius: 10px;
    &:hover{
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
