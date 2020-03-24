<template>
  <div class="tasklist">
    <div id="head">
        <h2>{{name}}해야될 일이 요만큼</h2>
    </div>
    <b-table>
      
    </b-table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return{   
      name: "",
    }
  },
  created:{
    userCheck: function(){
      var token = sessionStorage.getItem('token');
      axios.get('http://localhost:3000/users/me',{ token: token })
      .then((result)=>{
        if(result.type==true){
          this.name = result.name
        }
        else{
          return this.$route.go(-1)
        }
      })
      return this.$route.params;
    }
  }
}
</script>
<style>
#head{
  text-align: center;
  background-color: gainsboro;
  margin: 5%;
  padding: 5%;
}
</style>