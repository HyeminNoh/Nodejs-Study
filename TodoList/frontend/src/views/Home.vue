<template>
  <div class="home">
    <b-jumbotron id="main-jumbotron">
      <template v-slot:header>나 오늘 뭐하지?</template>
      <hr class="my-4" />
      <p style="font-size: 25px;">해야할 일을 체크해봐요 ㅇㅅㅇ</p>
      <div id="btn-div">
        <b-button class="main-btn" v-b-modal.signup variant="success" size="lg" href="#">회원가입</b-button>
        <b-button class="main-btn" v-b-modal.login variant="danger" size="lg" href="#">로그인</b-button>
      </div>
    </b-jumbotron> 
    <b-modal
      id="signup"
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="signupOk"
      title="회원가입"
    >
      <form ref="form" @submit.stop.prevent="handleSignup">
        <b-form-group
          :state="nameState"
          label="이름"
          label-for="name-input"
        >
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="pwdState"
          label="비밀번호"
          label-for="pwd-input"
        >
          <b-form-input id="pwd-input" v-model="pwd" :state="pwdState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="login"
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      title="로그인"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="이름"
          label-for="name-input"
        >
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="pwdState"
          label="비밀번호"
          label-for="pwd-input"
        >
          <b-form-input id="pwd-input" v-model="pwd" :state="pwdState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        name: '',
        nameState: null,
        pwd: '',
        pwdState: null,
      }
    },
    created:{
      sessionCheck: function(){
        if(sessionStorage.length!=0 && sessionStorage.getItem('token')){
          return this.$router.push('/tasklist');
        }
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        this.pwdState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
        this.pwd = ''
        this.pwdState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('login')
          axios.post('http://localhost:3000/users/login',{name: this.name, pwd: this.pwd})
          .then((result)=>{
            if(result.type == true){
              sessionStorage.setItem("token", result.token);
              return this.$router.push('/tasklist');
            }
            else{
              alert('로그인 실패, 다시 시도해보세요');
              return
            }
          })
        })
      },
      signupOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSignup()
      },
      handleSignup() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('signup')
          axios.post('http://localhost:3000/users/signup',{name: this.name, pwd: this.pwd})
          .then((result)=>{
            if(result.type == true){
              return alert('회원 가입 완료')
            }
            else{
              return alert('회원 가입 실패, 다시 시도해보세요')
            }
          });
        })
      }
    }
  }
</script>

<style lang="css">
#main-jumbotron {
  margin: 5%;
}
#btn-div{
  text-align: right;
}
.main-btn{
  margin: 1%;
}
</style>