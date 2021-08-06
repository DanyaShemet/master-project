<template>
  <div>
    <div class="menu">
      <div class="menu-links">
        <router-link to="/categories" active-class="active">Категории</router-link>
        <router-link to="/main" active-class="active">Главная</router-link>
        <router-link to="/statistic" active-class="active">Статистика</router-link>
      </div>
      <div class="logout">
        <p>
          {{info.name}}
        </p>
        <button @click="logout" class="logout-btn"><i class="material-icons">login</i></button>
      </div>

    </div>
      <div class="app-main-layout">
        <main class="app-content ">
          <div class="app-page">
            <router-view/>
          </div>
        </main>

    </div>
    <div class="info">
      <p class="balance">{{info.emotions}}</p>
      <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.9499 8.0716C21.9021 14.8735 18.9008 19 14.9189 19C10.9369 19 0 12.371 0 8.38902C0 4.40704 6.99176 0 10.9737 0C14.9557 0 20.9499 4.08961 20.9499 8.0716Z" fill="black"/>
        <path d="M11.7405 4.43046C12.0062 6.3298 11.1687 7.48206 10.0577 7.48206C8.94662 7.48206 5.89502 5.63101 5.89502 4.51909C5.89502 3.40718 7.84586 2.17657 8.95691 2.17657C10.068 2.17657 11.7405 3.31854 11.7405 4.43046Z" fill="white"/>
        <path d="M10.4031 12.2457C10.5452 13.2604 10.0975 13.8759 9.5035 13.8759C8.90951 13.8759 7.27808 12.8871 7.27808 12.2931C7.27808 11.6991 8.32103 11.0417 8.91501 11.0417C9.509 11.0417 10.4031 11.6518 10.4031 12.2457Z" fill="white"/>
        <path d="M18.0186 7.02012C19.1425 8.57415 18.9418 9.98438 17.96 10.5045C16.9782 11.0245 13.4151 10.8173 12.8946 9.83468C12.3741 8.85211 13.522 6.85147 14.5038 6.33139C15.4856 5.8113 17.4981 6.03755 18.0186 7.02012Z" fill="white"/>
      </svg>

    </div>
  </div>


</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'main-layout',
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchInfo')
  },
  computed: {
    ...mapGetters(['info']),
  }
}
</script>

<style lang="scss">

.menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #000;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  .menu-links{
    display: flex;
    height: 98%;
    a {
      color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      padding: 0 40px;
      border: 1px solid transparent;
      transition: all .3s;
      border-radius: 4px;

      &.active {
        border: 1px solid #fff;
      }
    }
  }
}

.logout{
  position: absolute;
  right: 30px;
  color: #fff;
  display: flex;
  align-items: center;
  p{
    font-weight: 700;
    margin-right: 10px;
    font-size: 15px;
  }
  button{
    margin-top: 2px;
    cursor: pointer;
    color: #fff;
    &:focus{
      background-color: #fff;
    }

  }
}
.info {
  position: absolute;
  right: 3%;
  top: 4%;
  display: flex;
  align-items: center;

  p{
    font-weight: 700;
    margin-right: 10px;
    font-size: 25px;
  }
  .balance{
    font-size: 30px;
  }
  svg{
    margin-right: 20px;
  }
}

@media screen and (max-width: 768px){
  .info{
    top: 2%;
  }
  .menu{
    flex-direction: column;
    height: 100px;
    .menu-links{
      border-bottom: 1px solid #fff;
      padding: 1px 0 10px 0;
    }
  }
  .logout{
    position: initial;
    padding: 5px 0 10px 0;
  }
}
@media screen and (max-width: 768px){

  .menu{
    .menu-links a{
      font-size: 14px;
      padding: 0 10px;
    }
  }

}
</style>
