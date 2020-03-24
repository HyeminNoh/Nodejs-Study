<template>
  <div class="tasklist">
    <div id="head">
      <h2>{{name}} 해야될 일이 요만큼</h2>
    </div>
    <b-table></b-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      userData: [],
    };
  },
  created() {
    this.userCheck()
  },
  methods: {
    userCheck: function() {
      var token = sessionStorage.getItem("token");
      axios
        .get("/users/me", {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(result => {
          if (result.data.type == true) {
            this.name = result.data.data.name;
            this.userData = result.data.data;
            this.loadData();
          } else {
            return this.$route.go(-1);
          }
        });
    },
    loadData: function(){
      
    }
  }
};
</script>
<style>
#head {
  text-align: center;
  background-color: gainsboro;
  margin: 5%;
  padding: 5%;
}
</style>