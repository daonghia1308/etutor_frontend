<template>
  <div>
    <vs-prompt
      color="primary"
      title="Create class"
      accept-text="Create"
      @accept="createClass"
      :is-valid="validName"
      :active.sync="activePrompt2"
    >
      <div class="con-exemple-prompt">
        Enter class information to
        <b>continue</b>
        <div class="dialogInput">
          <el-input
            style="margin-top: 10px;"
            placeholder="Please input class name"
            v-model="inputClassName"
            clearable
          ></el-input>
          <el-input
            style="margin-top: 10px;"
            placeholder="Please input class description"
            v-model="inputClassDes"
            clearable
          ></el-input>
        </div>

        <vs-alert
          :active="!validName"
          color="danger"
          icon="new_releases"
        >Fields can not be empty please enter the data</vs-alert>
      </div>
    </vs-prompt>
    <el-header style="text-align: left; background-color: white">
      <span style="font-size: 30px">Manage Allocated</span>
      <vs-button
        @click="activePrompt2 = true"
        color="success"
        type="gradient"
        style="position: realative; right: 140px; padding: 0px 10px 0px 10px; top: 80px"
      >+ Add </vs-button>
      <vs-button
        @click="deleteClass(classInfo.id)"
        color="danger"
        type="gradient"
        style="position: realative; right: 140px; padding: 0px 10px 0px 10px; top: 80px"
      >Delete</vs-button>
    </el-header>
    <hr style="border: 2px solid rgba(0, 77, 77, 0.9); border-radius: 5px;" />
    <div class="box">
      <el-row>
        <el-col :md="12">
          <div class="box-item">
            <el-row>
              <el-col :md="8">
                <a-icon type="solution" style="font-size: 180px" />
              </el-col>
              <el-col :md="16" style="text-align: left; ">
                <p
                  style="text-align:center; color: rgba(0, 77, 77, 0.9); font-weight:bold"
                >Tutor information</p>
                <span style="font-weight: bold">Full Name:</span>
                <span>{{tutorInfo.fullName}}</span>
                <br />
                <span style="font-weight: bold">Phone:</span>
                <span>{{tutorInfo.phone}}</span>
                <br />
                <span style="font-weight: bold">Email:</span>
                <span>{{tutorInfo.email}}</span>
                <br />
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :md="12">
          <b-form-tags v-model="selectStudentName" no-outer-focus class="mb-2">
            <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant}">
              <b-input-group class="mb-2">
                <el-autocomplete
                  style="width: 80%"
                  v-model="studentsState"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="Please input"
                  @select="handleSelect"
                >
                  <template slot-scope="{ item }">
                    <div>{{ item.fullName }}</div>
                    <span class="el-icon-message">{{ item.email }}</span>
                  </template>
                </el-autocomplete>
                <vs-button type="gradient" @click="addStudent">+ Add student</vs-button>
              </b-input-group>
              <div class="d-inline-block" style="font-size: 1.5rem;">
                <b-form-tag
                  style="background-color: rgba(0, 77, 77, 0.9)"
                  v-for="tag in tags"
                  @remove="handleUnselect(tag)"
                  :key="tag"
                  :title="tag"
                  :variant="tagVariant"
                  class="mr-1"
                >{{ tag }}</b-form-tag>
              </div>
            </template>
          </b-form-tags>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <!-- <b-button @click="toggleBusy">Toggle Busy State</b-button> -->
      <table id="customers">
        <tr>
          <th>Id</th>
          <th>Full Name</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
        <tr
          v-for="(c,index) in tutors"
          v-bind:key="index"
          @click="getTutorDetail(c.id)"
          style="cursor: pointer"
        >
          <td>{{c.id}}</td>
          <td>{{c.fullName}}</td>
          <td>{{c.phone}}</td>
          <td>{{c.email}}</td>
        </tr>
      </table>
      <div class="centerx" v-on:click="getTutors">
        <a-pagination
          v-model="current"
          :total="totalPage"
          :defaultPageSize="3"
          style="padding: 20px"
        ></a-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dataService from "../network/dataService";
import _ from "lodash";
export default {
  data() {
    return {
      select1: 2,
      activePrompt2: false,
      val: "",
      valMultipe: {
        value1: "",
        value2: ""
      },
      inputClassName: "",
      inputClassDes: "",
      className: "",
      classDes: "",
      tutorState: "",
      studentsState: "",
      studentId: 0,
      tutorId: 0,
      classes: [],
      limit: 3,
      skip: 0,
      totalPage: 0,
      current: 1,
      classInfo: {},
      tutorInfo: {},
      id: 0,
      students: [],
      selectStudentId: [],
      studentName: "",
      selectStudentName: [],
      tutors: []
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      var students = this.students;
      var results = queryString
        ? students.filter(this.createFilter(queryString))
        : students;
      cb(results);
    },
    createFilter(queryString) {
      return student => {
        return (
          student.fullName.toLowerCase().includes(queryString.toLowerCase()) ==
          true
        );
      };
    },
    handleSelectTutor(item) {
      this.tutorId = item.id;
      this.tutorState = item.fullName;
    },
    handleSelect(item) {
      this.studentId = item.id;
      this.studentName = item.fullName;
      this.selectStudentId = _.uniq([...this.selectStudentId, this.studentId]);
      this.selectStudentName = _.uniq([
        ...this.selectStudentName,
        this.studentName
      ]);
      this.studentsState = "";
    },
    handleUnselect(tag) {
      let index = this.selectStudentName.indexOf(tag);
      this.selectStudentName.splice(index, 1);
      this.selectStudentId.splice(index, 1);
    },
    querySearch(queryString, cb) {
      var tutors = this.tutors;
      var results = queryString
        ? tutors.filter(e => {
            return (
              e.fullName.toLowerCase().includes(queryString.toLowerCase()) ==
              true
            );
          })
        : tutors;
      cb(results);
    },
    deleteClass(id) {
      this.$alert(`Do you want to delete class have id = ${id}`, "Warning!!!", {
        confirmButtonText: "OK",
        callback: async action => {
          this.action = action;
          if (action == "confirm") {
            let rs = await dataService.deleteClass({ id: id });
            if (rs.code == 0) {
              this.$message({
                type: "success",
                message: rs.message
              });
              await this.getClass();
            } else {
              this.$message({
                type: "error",
                message: rs.message
              });
            }
          }
        }
      });
    },
    async getClass() {
      this.skip = this.limit * this.current - this.limit;
      let rs = await dataService.getClass({
        skip: this.skip,
        limit: this.limit
      });
      if (rs.code == 0) {
        this.classes = rs.data;
        this.totalPage = rs.total;
      }
    },
    async getClassDetail(id) {
      let rs = await dataService.getClass({ id });

      if (rs.code == 0) {
        this.classInfo = rs.data;
        this.className = rs.data.name;
        this.classDes = rs.data.description;
        if (rs.data.tutor != 0) {
          this.tutorId = rs.data.tutor.id;
        }
        this.tutorState = this.classInfo.tutor.fullName;
        this.selectStudentName = rs.data.studentsName;
        this.selectStudentId = rs.data.students;
      }
    },
    getId(id) {
      this.id = id;
    },
    async getStudents() {
      let rs = await dataService.getUsers({ role: 3 });
      if (rs.code == 0) {
        this.students = rs.data;
      }
    },
    async getTutors() {
      let rs = await dataService.getUsers({ role: 2 });
      if (rs.code == 0) {
        this.tutors = rs.data;
        this.totalPage = rs.total;
      }
    },
    async editClass(id) {
      let data = {
        id,
        name: this.className,
        description: this.classDes,
        tutor: this.tutorId
      };
      let rs = await dataService.editClass(data);
      if (rs.code == 0) {
        this.$message({
          type: "success",
          message: rs.message
        });
        this.id = 0;
        await this.getClass();
        await this.getClassDetail(id);
      } else {
        this.$message({
          type: "error",
          message: rs.message
        });
        this.id = 0;
      }
    },
    async addStudent() {
      let data = {
        tutor: this.tutorInfo.id,
        students: this.selectStudentId
      };
      let rs = await dataService.editClass(data);
      if (rs.code == 0) {
        this.$message({
          type: "success",
          message: rs.message
        });
        await this.getClass();
        await this.getStudents();
      } else {
        this.$message({
          type: "error",
          message: rs.message
        });
      }
    },
    async createClass() {
      let data = {
        name: this.inputClassName,
        description: this.inputClassDes
      };
      let rs = await dataService.createClass(data);
      if (rs.code == 0) {
        this.$message({
          type: "success",
          message: rs.message
        });
      } else {
        this.$message({
          type: "error",
          message: rs.message
        });
      }
      (this.inputClassDes = ""), (this.inputClassName = "");
    },
    async getTutorDetail(id) {
      let rs = await dataService.getUserDetail({ id: id });
      if (rs.code == 0) {
        this.tutorInfo = rs.data;
        this.selectStudentName = rs.data.studentsName;
        this.selectStudentId = rs.data.students;
      }
    }
  },
  mounted() {
    this.getTutorDetail(2);
    this.getStudents();
    this.getTutors();
  },
  computed: {
    validName() {
      return this.inputClassName != "" && this.inputClassDes != "";
    }
  }
};
</script>

<style scope>
.box {
  width: auto;
  -webkit-box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.9) !important;
  -moz-box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.9) !important;
  box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.4) !important;
  border-radius: 6px;
  padding: 30px;
  margin: 15px;
  margin-bottom: 28px;
}
.box-item {
  width: auto;
  border: 1px solid rgb(216, 214, 214);
  background-color: white;
  border-radius: 6px;
  padding: 30px;
  margin: 2px 15px;
}
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  text-align: center;
  border: 1px solid #ddd;
  padding: 8px;
}
#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: rgba(0, 77, 77, 0.9);
  color: white;
}
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
.dialogInput {
  margin-bottom: 18px;
}
</style>