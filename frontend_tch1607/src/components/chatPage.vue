<template>
  <div>
    <p>{{msg}}</p>
    <p>{{message}}</p>
    <input type="text" v-model="input" />
    <button @click="sendMess">send</button>
    <button @click="getMess">get</button>
    <div class="chatBox">
      <div class="header">
        <p>UserName</p>
      </div>
      <p>adsaasd</p>
    </div>
  </div>
</template>

<script>
import dataService from "../network/dataService";
import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";
import { io } from "../globalVar";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      message: "",
      input: ""
    };
  },
  methods: {
    sendMess() {
      io.socket.post(
        "/api/meeting/send-mess",
        { text: this.input },
        (resData, jwRes) => {}
      );
    },
    getMess() {
      io.socket.post("/api/meeting/get-mess", { id: 1 }, (resData, jwRes) => {
        console.log(resData, jwRes);
      });
    }
  },
  created() {
    io.socket.on("chatmessage", msg => {
      this.message = msg.text;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatBox {
  -webkit-box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  -moz-box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  width: 280px;
  height: 320px;
  border-radius: 20px;
  position: relative;
  top: 180px;
  left: 1070px;
}
.header {
  background-color: rgba(0, 77, 77, 0.9);
  border-radius: 20px 20px 0px 0px;
  color: white;
  text-align: left;
  padding: 5px;
}
</style>
