<template>
  <dir id="Header">
    <nav>
      <router-link to="/" class="items">오늘 할 일</router-link>
    </nav>
  </dir>
</template>

<style lang="css">
#Header nav {
  width: 95%;
  color: black;
  font-weight: bold;
  min-height: 50px;
  font-family: comfortaa;
}
#Header .items {
  margin-top: 1.4em;
  float: left;
  margin-left: 30px;
  outline: none;
  font-size: 20px;
  color: black;
  text-decoration: none;
}
#Header .items:hover {
  outline: none;
  color: #ff4d5a;
  text-decoration: none;
}
</style>