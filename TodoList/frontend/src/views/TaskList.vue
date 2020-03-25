<template>
  <div class="tasklist">
    <b-input-group :prepend="this.name">
      <b-form-input id="task-input" v-model="taskInput" required></b-form-input>
      <b-input-group-append>
        <b-button @click="submit" variant="outline-success">추 가</b-button>
      </b-input-group-append>
    </b-input-group>
    <div id="task-lists">
      <b-list-group v-if="taskState && taskList.length">
        <b-list-group-item class="d-flex justify-content-between" v-for="(item, index) in taskList" :key="index">
          <b-form-checkbox size="lg">
            <p>{{item.title}}</p>
          </b-form-checkbox>
          <div>
            <b-button style="margin-right:10px;">수 정</b-button>
            <b-button >삭 제</b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      userData: [],
      taskState: false,
      taskList: [],
      taskInput: "",
    };
  },
  created() {
    this.userCheck();
  },
  methods: {
    userCheck: function() {
      var token = sessionStorage.getItem("token");
      axios
        .get("/users/me", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token
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
    loadData: function() {
      axios
        .get("/tasks/" + this.userData._id, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(result => {
          if (result.data.type == true) {
            this.taskState = "true";
            this.taskList = result.data.data;
          } else {
            this.taskState = "false";
            var cards = document.getElementById("task-cards");
            var notask = document.createElement("div");
            notask.innerText = this.name + " " + result.data.data + " 😝";
            notask.id = "notask";
            cards.appendChild(notask);
          }
        });
    },
    submit: function() {
      axios
        .post("/tasks/", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/x-www-form-urlencoded"
          },
          id: this.userData._id,
          title: this.taskInput,
          completed: false
        })
        .then(result => {
          console.log(result);
          this.$route.push("/");
        });
    }
  }
};
</script>
<style>
.tasklist {
  margin: 5%;
}
#task-lists {
  margin-top: 20px;
}
#notask {
  margin-top: 5%;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
}
</style>