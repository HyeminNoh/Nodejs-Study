<template>
  <div class="home">
    <b-jumbotron id="main-jumbotron">
      <template v-slot:header>나 오늘 뭐하지?</template>
      <hr class="my-4" />
      <p style="font-size: 25px;">해야할 일을 체크해봐요 ㅇㅅㅇ</p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  created() {
    this.sessionCheck();
  },
  methods: {
    sessionCheck: function() {
      if (sessionStorage.length != 0) {
        return this.$router.push("/tasklist");
      }
    }
  }
};
</script>

<style lang="css">
#main-jumbotron {
  margin: 5%;
}
#btn-div {
  text-align: right;
}
.main-btn {
  margin: 1%;
}
</style>