<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: left; background-color: white">
          <span style="font-size: 30px">DASHBOARD</span>
        </el-header>
        <hr style="border: 2px solid rgba(0, 77, 77, 0.9); border-radius: 5px;" />
        <el-row >
          <el-col :md="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>NUMBER OF STUDENTS</span>
                <!-- <span style="float: right; padding: 3px 0" type="text">Operation button</span> -->
              </div>
              <div class="text item">
                <el-row>
                  <el-col :span="24">
                    <span
                      class="el-icon-user-solid"
                      style="font-size: 50px; color: rgba(0, 77, 77, 1)"
                    ></span>
                    <span style="font-size: 50px">{{students}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>NUMBER OF TUTORS</span>
                <!-- <span style="float: right; padding: 3px 0" type="text">Operation button</span> -->
              </div>
              <div class="text item">
                <el-row>
                  <el-col :span="24">
                    <span
                      class="el-icon-s-custom"
                      style="font-size: 50px; color: rgba(0, 77, 77, 1)"
                    ></span>
                    <span style="font-size: 50px">{{tutors}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>NUMBER OF CLASS</span>
                <!-- <span style="float: right; padding: 3px 0" type="text">Operation button</span> -->
              </div>
              <div class="text item">
                <el-row>
                  <el-col :span="24">
                    <span
                      class="el-icon-school"
                      style="font-size: 50px;   color: rgba(0, 77, 77, 1)"
                    ></span>
                    <span style="font-size: 50px">{{classes}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
          <el-card class="box-card-list">
            <div slot="header" class="clearfix">
              <span>TO DO LIST</span>
            </div>
            <task-list/>
          </el-card>
        </el-row>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TaskList from './TaskList.vue'
import dataService from "../network/dataService"
export default {
  name: "home-page",
  data() {
    return { 
      tutors: 0,
      classes: 0,
      students: 0
    }
  },
  components: {
    TaskList
  },
  methods: {
    async getTotalUser() {
      let rs = await dataService.getTotalUser();
      if (rs.code == 0) {
        this.tutors = rs.data.findTutors,
        this.classes = rs.data.findClasses,
        this.students = rs.data.findStudents
      }
    }
  },
  mounted() {
    this.getTotalUser();
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  border-bottom: 5px solid black;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: auto;
  width: 40%;
  height: 150px;
  margin-bottom: 25px;
  -webkit-box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.9) !important;
  -moz-box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.9) !important;
  box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.4) !important;
}
.box-card-list {
  margin: auto;
  width: 40%;
  height: 90%;
  margin-bottom: 25px;
  -webkit-box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.9) !important;
  -moz-box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.9) !important;
  box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.4) !important;
}
@media only screen and (max-width: 600px) {
  .box-card {
    width: 85%
  }
  .box-card-list {
    width: 85%
  }
}
</style>