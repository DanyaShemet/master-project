<template>

  <div class="check">
    <h2>Вчитель чи учень? Обери себе</h2>
    <div class="check__wrapper">
      <div class="check__teacher" @click="signTeacher">
        <img src="../assets/teacher.png" alt="">
      </div>
      <div class="check__student" @click="signStudent">
        <img src="../assets/student.png" alt="">
      </div>
    </div>
    <CheckForm :password="PASSWORD" v-if="isShowTeacherForm" @accept="acceptTeacher" @hideForm="hideForm" />
  </div>
</template>

<script>
import CheckForm from "../components/CheckForm";

const PASSWORD = 'q1w2e3r4'
export default {
  name: "Check",
  data(){
    return{
      PASSWORD,
      isShowTeacherForm: false,
    }
  },
  components: {
    CheckForm
  },
  methods: {
    signTeacher(){
      this.isShowTeacherForm = true
    },
    signStudent(){
      this.$router.push({
        name: 'main',
        params: {status: 'student'}
      })
    },
    acceptTeacher(){
      this.isShowTeacherForm = false
      this.$router.push({
        name: 'main',
        params: {status: 'teacher'}
      })
    },
    hideForm(){
      this.isShowTeacherForm = false
    },
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/_vars.scss';
.check{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
h2{
  margin-bottom: 20px;
}
.check__teacher{
  margin-right: 10px;
}
.check__wrapper{
  display: flex;
  width: 50%;
}
.check__teacher, .check__student{
  cursor: pointer;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #FF8C00;
  height: 200px;
  border-radius: 10px;
  transition: all .3s;
  &:hover{
    background-color: $primary-color;
  }
}
</style>