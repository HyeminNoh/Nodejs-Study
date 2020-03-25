<template>
  <dir id="Header">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand to="/" class="items">오늘 할 일</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button v-show='btnState' size="lg" class="mr-sm-1" v-b-modal.signup variant="success">회원가입</b-button>
        <b-button v-show='btnState' size="lg" class="mr-sm-1" v-b-modal.login variant="outline-danger">로그인</b-button>
        <b-button v-show='!btnState' size="lg" class="mr-sm-1" @click='logout' variant="outline-danger">로그아웃</b-button>
      </b-navbar-nav>
    </b-navbar>
    <b-modal
      id="signup"
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="signupOk"
      title="회원가입"
    >
      <form ref="form" @submit.stop.prevent="handleSignup">
        <b-form-group :state="nameState" label="이름" label-for="name-input">
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group :state="pwdState" label="비밀번호" label-for="pwd-input">
          <b-form-input type="password" aria-describedby="password-help-block" id="pwd-input" v-model="pwd" :state="pwdState" required></b-form-input>
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
        <b-form-group :state="nameState" label="이름" label-for="name-input">
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group :state="pwdState" label="비밀번호" label-for="pwd-input">
          <b-form-input type="password" aria-describedby="password-help-block" id="pwd-input" v-model="pwd" :state="pwdState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </dir>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: '',
      nameState: null,
      pwd: '',
      pwdState: null,
      btnState: '',
    };
  },
  created() {
    this.sessionCheck();
  },
  methods: {
    sessionCheck: function() {
      if (sessionStorage.length != 0) {
        this.btnState = false
      }
      else{
        this.btnState = true
      }
    },
    logout: function() {
      sessionStorage.removeItem('token');
      this.btnState = !this.btnState;
      this.$router.push('/')
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.pwdState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
      this.pwd = "";
      this.pwdState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("login");
        axios
          .post('/users/login/', {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/x-www-form-urlencoded'
            },
            name: this.name,
            pwd: this.pwd
            
          })
          .then(result => {
            if (result.data.type == true) {
              sessionStorage.setItem("token", result.data.token);
              this.btnState = !this.btnState;
              return this.$router.push("/tasklist");
            } else {
              alert(result.data.data);
              return;
            }
          });
      });
    },
    signupOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSignup();
    },
    handleSignup() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("signup");
        axios
          .post('/users/signup/', {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/x-www-form-urlencoded'
            },
            name: this.name,
            pwd: this.pwd
          })
          .then(result => {
            if (result.data.type == true) {
              return alert("회원 가입 완료");
            } else {
              return alert(result.data.data);
            }
          });
      });
    }
  }
};
</script>
<style lang="css">
#Header nav {
  width: 95%;
  color: black;
  font-weight: bold;
  min-height: 40px;
  font-family: comfortaa;
}
#Header .items {
  margin-top: 1.4em;
  float: left;
  margin-left: 30px;
  outline: none;
  font-size: 30px;
  color: black;
  text-decoration: none;
}
#Header .items:hover {
  outline: none;
  color: #ff4d5a;
  text-decoration: none;
}
</style>