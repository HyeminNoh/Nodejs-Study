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
          <b-form-checkbox v-model=item.completed size="lg" disabled>
          </b-form-checkbox>
          <h5>{{item.title}}</h5>
          <div>
            <b-button :id=index @click="update($event)" style="margin-right:10px;">수 정</b-button>
            <b-button :id=index @click="remove($event)">삭 제</b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="내용 고치기"
      :visible.sync="modalVisible"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form">
        <b-form-group
          label="다 했나용? "
          label-for="completed-input"
        >
          <b-form-checkbox
            id="completed-input"
            v-model="updateCompleted"
            required
          >👈 체크 해주세요!</b-form-checkbox>
        </b-form-group>
        <b-form-group
          :state="updateState"
          label="내 용"
          label-for="title-input"
          invalid-feedback="내용을 넣어주세요"
        >
          <b-form-input
            id="title-input"
            v-model="updateTitle"
            :state="updateState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      userData: [],
      taskState: null,
      taskList: [],
      taskInput: "",
      modalVisible: null,
      updateCompleted: null,
      updateTitle: "",
      updateState: null,
      updateIndex: '',
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
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/x-www-form-urlencoded'
            },
          id: this.userData._id,
          title: this.taskInput,
          completed: false
        })
        .then(result => {
          this.taskInput = "";
          alert(result.status+": 추가 성공");
          this.loadData();
        });
    },
    update: function(element){
      var listIndex = element.currentTarget.id;
      var selectedTask = this.taskList[listIndex];
      this.updateTitle = selectedTask.title;
      this.updateCompleted = selectedTask.completed;
      this.updateIndex = selectedTask._id;
      this.modalVisible = true;
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.updateState = valid
        return valid
      },
      resetModal() {
        this.updateTitle = ''
        this.updateCompleted = null
        this.updateIndex = ''
      },
      handleOk() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        axios.patch('/tasks/'+this.updateIndex,{
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/x-www-form-urlencoded'
            },
          title: this.updateTitle,
          completed: this.updateCompleted
        })
        .then(result => {
          this.modalVisible = false;
          alert(result.status+": 수정 성공");
          this.loadData();
        });
        // Hide the modal manually
        this.$nextTick(() => {
          this.modalVisible = false;
        })
      },
    remove: function(element) {
      var listIndex = element.currentTarget.id;
      var taskId = this.taskList[listIndex]._id;
      axios.delete('/tasks/'+taskId)
      .then(result=>{
        alert(result.data.statusText+": 삭제 성공");
        this.loadData();
      })
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