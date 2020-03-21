<template>
  <div class="home">
    <b-jumbotron id="main-jumbotron">
      <template v-slot:header>나 오늘 뭐하지?</template>
      <hr class="my-4" />
      <p style="font-size: 25px;">해야할 일을 체크해봐요 ㅇㅅㅇ</p>
      <div id="btn-div">
        <b-button class="main-btn" v-b-modal.join variant="success" size="lg" href="#">회원가입</b-button>
        <b-button class="main-btn" v-b-modal.login variant="danger" size="lg" href="#">로그인</b-button>
      </div>
    </b-jumbotron> 
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
          invalid-feedback="이름을 입력해주세요"
        >
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        nameState: null,
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
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
        // Push the name to submitted names
        console.log(this.name);
        // 페이지 이동
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('login')
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