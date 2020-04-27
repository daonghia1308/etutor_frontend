<template>
  <div>
    <el-row>
      <div v-for="(classbox, index) in listClass" :key="index">
        <el-col :md="6">
          <div class="classBox">
            <div
              class="headerClass"
              style="background-image: linear-gradient(to right top, #053733, #00644b, #009251, #54c044, #a8eb12);"
            >
              <p>STUDENT</p>
              <p>{{classbox.students['fullName']}}</p>
            </div>
            <img
              src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg"
              alt
              style="border-radius: 35px; width: 60px; height: 60px; position: relative; bottom: 45px; left: 100px;"
            />
            <div class="footer">
              <hr />
              <router-link :to="`/detail/${classbox.id}`" tag="a" style="color: white">
                <vs-button type="gradient" style="padding-left: 15px;">Go to class</vs-button>
              </router-link>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import dataService from "../network/dataService";
export default {
  name: "list-class",
  data() {
    return {
      listClass: []
    };
  },
  methods: {
    async getListClass() {
      let id = JSON.parse(sessionStorage.getItem("userInfo"))["id"];
      let rs = await dataService.getListClass({ id: id });
      if (rs.code == 0) {
        this.listClass = rs.data;
      }
    },
    async getAllClass() {
      let rs = await dataService.getListClass({id: JSON.parse(sessionStorage.getItem("userInfo"))["id"], type: "all"})
      if (rs.code == 0) {
        this.listClass = rs.data;
      }
    }
  },
  mounted() {
    if(JSON.parse(sessionStorage.getItem("userInfo"))["role"] == 2) {
      this.getListClass();
    }
    if(JSON.parse(sessionStorage.getItem("userInfo"))["role"] == 1) {
      this.getAllClass();
    }
  }
};
</script>

<style>
.classBox {
  -webkit-box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  -moz-box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  box-shadow: 7px 4px 16px 6px rgba(168, 163, 163, 1) !important;
  margin-top: 15px;
  margin-left: 10px;
  width: 300px;
  height: 280px;
  border-radius: 10px;
}
.headerClass {
  border-radius: 10px 10px 0px 0px;
  color: white;
  text-align: left;
  padding-left: 10px;
  height: fit-content;
}
.footer {
  position: relative;
  top: 50px;
  text-align: left;
}
</style>