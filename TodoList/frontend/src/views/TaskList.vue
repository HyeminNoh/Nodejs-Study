<template>
  <div class="tasklist">
    <div id="head">
        <h2>{{param.name}}해야될 일이 요만큼</h2>
    </div>
    <b-table>
      
    </b-table>
  </div>
</template>
<script>
export default {
  computed:{
    param: function(){
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