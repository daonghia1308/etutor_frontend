<template>
  <div>
    <a-modal title="Calender" v-model="openCalender" centered width="600" :footer="null">
      <el-row>
        <el-col :md="8">
          <h6>New event</h6>
          <a-input placeholder="Event title" v-model="newEventTitle" />
          <br />
          <br />
          <a-date-picker @change="changeDate" style="width:100%" />
          <br />
          <br />
          <a-button
            type="primary"
            block
            :disabled="disableCreateEvent"
            @click="createMeeting"
          >Create</a-button>
        </el-col>
      </el-row>
      <a-calendar @panelChange="onPanelChange">
        <ul class="events" slot="dateCellRender" slot-scope="value">
          <li v-for="item in getListData(value)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </a-calendar>
    </a-modal>
    <el-row>
      <el-col :md="5">
        <div class="div-member">
          <h5>Member</h5>
          <h6>{{student}}</h6>
          <hr />
          <h5>Tutor</h5>
          <h6>{{tutor}}</h6>
        </div>
        <a-button type="primary" @click="openCalender = true" block>Calender</a-button>
      </el-col>
      <el-col :md="12">
        <div class="post-box" v-if="show == true">
          <el-input type="textarea" :rows="2" placeholder="Please input" v-model="text"></el-input>
          <el-upload
            class="upload-demo"
            action="http://localhost:1337/api/file/upload-image"
            :headers="config"
            :http-request="Upload"
            :on-remove="handleRemove"
            :before-upload="handleUpload"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary" class="add-file-button">
              Upload
              <i class="el-icon-upload el-icon-right"></i>
            </el-button>
          </el-upload>
          <!-- <el-button type="primary" class="add-file-button" @click="uploadFile">
            Upload
            <i class="el-icon-upload el-icon-right"></i>
          </el-button>-->

          <el-button type="primary" class="cancle-button" @click="showInputPost">Cancel</el-button>
          <el-button type="primary" class="post-button" @click="createPost">Post</el-button>
        </div>
        <div class="post-box" v-if="show == false" @click="showInputPost" style="cursor: pointer">
          <p style="text-align: left; ">Share something ......</p>
        </div>
        <div v-for="(post, index) in posts" :key="index">
          <div class="note-box">
            <el-row>
              <el-col :span="2">
                <img
                  src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg"
                  style="border-radius: 25px; "
                  alt
                />
              </el-col>
              <el-col :span="8">
                <h3 style="font-size: 15px; font-weight: bold">{{post.postBy.fullName}}</h3>
                <p style="font-size: 13px">{{post.createdAt}}</p>
              </el-col>
            </el-row>
            <b-card-text>{{post.content}}</b-card-text>
            <div class="file-box" v-for="(file, index) in post.files" :key="index">
              <a :href="`http://localhost:1337/${file.serverFileName}`">
                <el-row>
                  <el-col :span="1">
                    <span class="el-icon-document" style="font-size: 20px;"></span>
                  </el-col>
                  <el-col :span="8">
                    <b-card-text style="width: 300%">{{file.fileName}}</b-card-text>
                  </el-col>
                </el-row>
              </a>
            </div>
            <div class="block" v-if="post.images.length > 0">
              <el-carousel trigger="click" :autoplay="false">
                <el-carousel-item v-for="(image, index) in post.images" :key="index">
                  <a :href="image.url">
                    <el-image :src="image.url"></el-image>
                  </a>
                </el-carousel-item>
              </el-carousel>
            </div>
            <hr />
            <div v-if="post.comment.length > 0">
              <div v-for="(comment,index) in post.comment" :key="index">
                <el-row style="margin-bottom: 5px">
                  <el-col :span="2">
                    <img
                      src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg"
                      style="border-radius: 25px;"
                      alt
                    />
                  </el-col>
                  <el-col :span="8">
                    <div class="comment-box">
                      <h3 style="font-size: 15px; font-weight: bold">{{comment.commentBy.fullName}}</h3>
                      <b-card-text>{{comment.content}}</b-card-text>
                    </div>
                    <p style="font-size: 13px">{{comment.createdAt}}</p>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-row>
              <el-col :span="2">
                <img
                  src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg"
                  style="border-radius: 25px;"
                  alt
                />
              </el-col>
              <el-col :span="8">
                <vs-input
                  icon-after="true"
                  icon="send"
                  style="width: 280%"
                  v-model="value2"
                  @keyup.enter="createComment(post.id)"
                />
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="chatBox">
      <div class="header">
        <el-row>
          <el-col :span="4">
            <img
              src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg"
              style="border-radius: 25px;"
              alt
            />
          </el-col>
          <el-col :span="6">
            <p>UserName</p>
          </el-col>
        </el-row>
      </div>
      <div class="bodyChat">
        <div v-for="(message, index) in messages" :key="index">
          <b-card-text
            :class="[message.sendBy == userId ? `messMyself` : `anotherMess`]"
          >{{message.text}}</b-card-text>
        </div>
      </div>
      <div class="inputChat">
        <input
          type="text"
          class="form-control"
          placeholder="message"
          aria-label="Username"
          v-model="inputChat"
          style="border-radius: 20px;"
          @keyup.enter="sendMess"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dataService from "../network/dataService";
import { post } from "axios";
import { io } from "../globalVar";
import moment from "moment";
export default {
  name: "class-page",
  data() {
    return {
      class: this.$route.params.id,
      show: false,
      userId: 0,
      input: "",
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      value2: "",
      listMeeting: [],
      month: "",
      year: "",
      posts: [],
      tutor: "",
      student: "",
      text: "",
      files: [],
      images: [],
      fileList: [],
      file: null,
      inputChat: "",
      messages: [],
      newEventDate: 0,
      newEventTitle: "",
      openCalender: false,
      config: {
        Authorization: "Bearer dev",
        "content-type": "multipart/form-data"
      }
    };
  },
  watch: {
    $route(to, from) {
      this.class = to.params.id;
    }
  },
  computed: {
    disableCreateEvent() {
      if (this.newEventDate === 0 || this.newEventTitle === "") return true;
      else return false;
    }
  },
  methods: {
    async onPanelChange(value, mode) {
      let rs;
      if (mode == "month") {
        this.month = value.startOf("month").valueOf();
      }
      if (mode == "year") {
        this.year = value.format();
      }
      if (!value) {
        rs = await getMeeting({month: moment().startOf("month").valueOf()})
        if (rs.code == 0) {
          rs.data = this.listMeeting;
        }
      } else {
        rs = await getMeeting({ month: this.month });
        if (rs.code == 0) {
          rs.data = this.listMeeting;
        }
      }
    },
    async createMeeting() {
      let data = {
        time: this.newEventDate,
        classId: this.class,
        title: this.newEventTitle
      };
      let rs = await dataService.createMeeting(data);
      if (rs.code == 0) {
        this.$message({
          type: "success",
          message: rs.message
        });
        this.newEventDate = 0;
        this.newEventTitle = "";
      }
    },
    changeDate(value) {
      this.newEventDate = value.valueOf();
    },
    getListData(value) {
      console.log("get list");
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            { type: "warning", content: "This is warning event." },
            { type: "success", content: "This is usual event." }
          ];
          break;
        case 10:
          listData = [
            { type: "warning", content: "This is warning event." },
            { type: "success", content: "This is usual event." },
            { type: "error", content: "This is error event." }
          ];
          break;
        case 15:
          listData = [
            { type: "warning", content: "This is warning event" },
            {
              type: "success",
              content: "This is very long usual event。。...."
            },
            { type: "error", content: "This is error event 1." },
            { type: "error", content: "This is error event 2." },
            { type: "error", content: "This is error event 3." },
            { type: "error", content: "This is error event 4." }
          ];
          break;
        default:
      }
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
    sendMess() {
      io.socket.post(
        "/api/meeting/send-mess",
        { text: this.inputChat, classId: this.class, id: this.userId },
        (resData, jwRes) => {}
      );
      this.getMess();
    },
    async getMess() {
      let rs = await dataService.getMess({ id: this.class });
      if (rs.code == 0) {
        this.messages = rs.data;
      }
    },
    async createComment(post) {
      let data = {
        id: JSON.parse(sessionStorage.getItem("userInfo"))["id"],
        post,
        content: this.value2
      };
      let rs = await dataService.createComment(data);
      if (rs.code == 0) {
        this.value2 = "";
        this.getClassDetail(this.class);
      }
    },
    async getClassDetail(id) {
      let rs = await dataService.getClassDetail({ class: id });
      if (rs.code == 0) {
        this.tutor = rs.data.class.tutor.fullName;
        this.student = rs.data.class.students.fullName;
        if (rs.data.posts.length > 0) {
          rs.data.posts.map(e => {
            e.createdAt = moment(e.createdAt).fromNow();
          });
          this.posts = rs.data.posts;
        }
      }
    },
    async createPost() {
      let data = {
        id: JSON.parse(sessionStorage.getItem("userInfo"))["id"],
        content: this.text,
        files: this.files,
        images: this.images,
        class: this.class
      };
      if (this.text != "") {
        let rs = await dataService.createPost(data);
        if (rs.code == 0) {
          this.showInputPost();
          this.text = "";
          await this.getClassDetail(this.class);
        }
      }
      this.showInputPost();
    },
    showInputPost() {
      this.show = !this.show;
      this.images = [];
      this.files = [];
      this.fileList = [];
      this.text = "";
    },
    async Upload() {
      let url;
      let formData;
      if (this.file.type.includes("image")) {
        url = "http://localhost:1337/api/file/upload-image";
        formData = new FormData();
        formData.append("images", this.file);
      } else {
        url = "http://localhost:1337/api/file/upload-file";
        formData = new FormData();
        formData.append("files", this.file);
      }
      const config = {
        headers: {
          Authorization: "Bearer dev",
          "content-type": "multipart/form-data"
        }
      };
      let rs = await post(url, formData, config);
      if (rs.data.code == 0) {
        if (rs.data.data.field == "images") {
          this.images.push(rs.data.data.id);
          this.fileList.push({
            id: rs.data.data.id,
            name: rs.data.data.fileName,
            url: rs.data.data.url
          });
        } else {
          this.files.push(rs.data.data[0].id);
          this.fileList.push({
            name: rs.data.data[0].fileName,
            url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvP8NZ4qv1RvhuYBf2jUSYvcuId-qJz5zyl4Xl-k0vC1c0IQA",
            id: rs.data.data[0].id
          });
        }
      }
    },
    handleUpload(file) {
      this.file = file;
    },
    handleRemove(file) {
      let index;
      let indexFL;
      let newFL = [];
      if (this.files.includes(file.id)) {
        index = this.files.indexOf(file.id);
        this.files.splice(index, 1);
        newFL = this.fileList.map(e => {
          return e.id;
        });
        indexFL = newFL.indexOf(file.id);
        this.fileList.splice(indexFL, 1);
      } else {
        index = this.images.indexOf(file.id);
        this.images.splice(index, 1);
        this.fileList.splice(index, 1);
        newFL = this.fileList.map(e => {
          return e.id;
        });
        indexFL = newFL.indexOf(file.id);
        this.fileList.splice(indexFL, 1);
      }
    }
  },

  mounted() {
    this.getClassDetail(this.class);
    this.getMess();
    this.userId = JSON.parse(sessionStorage.getItem("userInfo"))["id"];
    io.socket.on("chatmessage", msg => {
      this.messages.push(msg);
    });
  },
  created() {}
};
</script>

<style>
.anotherMess {
  border: 1px solid white;
  background-color: rgb(97, 87, 87);
  border-radius: 0px 10px 15px 10px;
  text-align: left;
  color: white;
  padding: 5px;
  width: 150px;
}
.messMyself {
  border: 1px solid white;
  background-color: rgb(48, 68, 246);
  border-radius: 10px 15px 0px 10px;
  text-align: left;
  color: white;
  width: 150px;
  position: relative;
  left: 125px;
  padding: 5px;
}
.inputChat {
}
.bodyChat {
  overflow-y: scroll;
  width: 300px;
  height: 250px;
}
.chatBox {
  -webkit-box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  -moz-box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  width: 300px;
  height: 340px;
  border-radius: 10px;
  position: absolute;
  top: 300px;
  left: 1040px;
}
.header {
  background-color: rgba(0, 77, 77, 0.9);
  border-radius: 10px 10px 0px 0px;
  color: white;
  text-align: left;
  padding: 5px;
}
.file-box {
  margin-bottom: 15px;
}
.div-member {
  margin: 5px;
  padding: 3px;
  border: solid 2px forestgreen;
  border-radius: 3px;
  text-align: left;
}
.post-box {
  margin: 20px;
  -webkit-box-shadow: 7px 6px 13px 2px rgba(0, 0, 0, 0.51) !important;
  -moz-box-shadow: 7px 6px 13px 2px rgba(0, 0, 0, 0.51) !important;
  box-shadow: 7px 6px 13px 2px rgba(0, 0, 0, 0.51) !important;
  border-radius: 5px;
  padding: 20px;
}
.note-box {
  margin: 20px;
  -webkit-box-shadow: 7px 6px 13px 2px rgba(0, 0, 0, 0.51) !important;
  -moz-box-shadow: 7px 6px 13px 2px rgba(0, 0, 0, 0.51) !important;
  box-shadow: 7px 6px 13px 2px rgba(0, 0, 0, 0.51) !important;
  border-radius: 5px;
  padding: 20px;
  text-align: left;
}
.comment-box {
  width: 200%;
  background-color: rgba(231, 222, 222, 0.918);
  border-radius: 15px;
  padding-left: 10px;
}
.input-comment {
  width: 250%;
  border-radius: 100px;
}
.add-file-button {
  position: relative;
  right: 295%;
  margin-top: 15px;
}
.cancle-button {
  position: relative;
  left: 35%;
  margin-top: 15px;
}
.post-button {
  position: relative;
  left: 35%;
  margin-top: 15px;
}
</style>