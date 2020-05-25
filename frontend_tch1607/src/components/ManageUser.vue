<template>
  <div>
    <vs-prompt
      color="primary"
      title="Create user"
      accept-text="Create"
      @accept="createUser"
      :is-valid="validName"
      :active.sync="activePrompt2"
    >
      <div class="con-exemple-prompt">
        Enter user information to
        <b>continue</b>
        <div class="dialogInput">
          <el-input
            style="margin-top: 10px;"
            placeholder="Please input username"
            v-model="inputUserName"
            clearable
          ><template slot="prepend" ></template></el-input>
          <el-input
            style="margin-top: 10px;"
            placeholder="Please input password"
            v-model="inputPassWord"
            show-password
          ></el-input>
          <el-input
            style="margin-top: 10px;"
            placeholder="Please input name"
            v-model="inputName"
            clearable
          ></el-input>
          <el-input
            style="margin-top: 10px;"
            type="number"
            placeholder="Please input phone number"
            v-model="inputPhone"
          ></el-input>
          <el-input
            style="margin-top: 10px;"
            placeholder="Please input email"
            v-model="inputEmail"
            clearable
          ></el-input>
          <vs-select class="selectExample" v-model="select2" style="margin-top: 10px; width: 100%">
            <vs-select-item
              :key="index"
              :value="item.id"
              :text="item.name"
              v-for="(item,index) in options"
            />
          </vs-select>
        </div>

        <vs-alert
          :active="!validName"
          color="danger"
          icon="new_releases"
          style="margin-top: 10px"
        >Fields can not be empty please enter the data</vs-alert>
      </div>
    </vs-prompt>
    <el-header style="text-align: left; background-color: white">
      <span style="font-size: 30px">Manager User</span>
      <vs-button
        @click="activePrompt2 = true"
        color="success"
        type="gradient"
        style="position: absolute; right: 60px; padding: 0px 10px 0px 10px; top: 80px"
      >+ Add User</vs-button>
    </el-header>
    <hr style="border: 2px solid rgba(0, 77, 77, 0.9); border-radius: 5px;" />
    <div>
      <el-dialog title="User activities" :visible.sync="dialogTableVisible">
        <el-table :data="actions" v-if="actions.length > 0">
          <el-table-column property="name" label="Name" width="200"></el-table-column>
          <el-table-column property="time" label="created at" width="200"></el-table-column>
          <el-table-column v-if="actions.length == 0">No data</el-table-column>
        </el-table>
        <p v-if="actions.length == 0" class="el-icon-document-delete" style="font-size: 30px"></p>
        <p v-if="actions.length == 0">No data</p>
      </el-dialog>
    </div>
    <div class="box">
      <!-- <b-button @click="toggleBusy">Toggle Busy State</b-button> -->
      <table id="customers">
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
        <tr v-for="(user,index) in data" v-bind:key="index">
          <td>{{user.id}}</td>
          <td>{{user.username}}</td>
          <td v-if="user.id != id">{{user.fullName}}</td>
          <td v-if="user.id != id">{{user.phone}}</td>
          <td v-if="user.id != id">{{user.email}}</td>
          <td v-if="user.id == id && id != 0">
            <a-input :name="fullName" v-model="fullName" />
          </td>
          <td v-if="user.id == id && id != 0">
            <a-input :name="phone" v-model="phone" />
          </td>
          <td v-if="user.id == id && id != 0">
            <a-input :name="email" v-model="email" />
          </td>
          <td>{{user.role}}</td>
          <td>
            <vs-button
              v-if="user.id != id"
              color="warning"
              type="gradient"
              class="el-icon-edit"
              v-on:click="getUser(user)"
            ></vs-button>
            <vs-button
              v-if="user.id == id && id != 0"
              color="success"
              type="gradient"
              class="el-icon-check"
              v-on:click="editUser(user.id)"
            ></vs-button>
            <vs-button
              color="danger"
              type="gradient"
              class="el-icon-delete"
              @click="deleteUser(user.id)"
            ></vs-button>
            <vs-button
              color="primary"
              type="gradient"
              class="el-icon-tickets"
              @click="getAction(user.id)"
            ></vs-button>
          </td>
        </tr>
      </table>

      <div class="centerx" v-on:click="getUsers">
        <a-pagination
          v-model="current"
          :total="totalPage"
          :defaultPageSize="5"
          style="padding: 20px; "
        ></a-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dataService from "../network/dataService";
import moment from "moment";
export default {
  data() {
    return {
      colorx: "rgba(0, 77, 77, 0.9)",
      current: 1,
      isBusy: false,
      limit: 5,
      skip: 0,
      data: [],
      select2: 0,
      selectedUser: 0,
      id: 0,
      totalPage: 0,
      fullName: "",
      phone: "",
      email: "",
      message: "",
      actions: [],
      options: [],
      inputUserName: "",
      inputPassWord: "",
      inputName: "",
      inputPhone: "",
      inputEmail: "",
      activePrompt2: false,
      dialogTableVisible: false
    };
  },
  mounted() {
    this.getUsers();
    this.getRoles();

  },
  methods: {
    async getRoles() {
      let rs = await dataService.getRoles();
      if ( rs.code == 0) {
        this.options = rs.data
      }
    },
    async getUsers() {
      this.skip = this.limit * this.current - this.limit;
      let rs = await dataService.getUsers({
        skip: this.skip,
        limit: this.limit
      });
      if (rs.code == 0) {
        this.data = rs.data;
        this.totalPage = rs.total;
      }
    },
    async getAction(id) {
      this.dialogTableVisible = true;
      let rs = await dataService.getAction({ id });
      if (rs.code == 0) {
        rs.data.map(e => {
          e.time = moment(e.createdAt).fromNow();
        });
        this.actions = rs.data;
      }
    },
    getUser(user) {
      this.id = user.id;
      this.fullName = user.fullName;
      this.phone = user.phone;
      this.email = user.email;
    },
    async editUser(id) {
      let rq = {
        id,
        fullName: this.fullName,
        phone: this.phone,
        email: this.email
      };
      let rs = await dataService.editUser(rq);
      if (rs.code == 0) {
        this.$message({
          type: "success",
          message: rs.message
        });
        this.id = 0;
        await this.getUsers();
      } else {
        this.$message({
          type: "error",
          message: rs.message
        });
        this.id = 0;
        await this.getUsers();
      }
    },
    async createUser() {
      let data = {
        username: this.inputUserName,
        password: this.inputPassWord,
        fullName: this.inputName,
        phone: this.inputPhone,
        email: this.inputEmail,
        role: this.select2
      }
      let rs = await dataService.createUser(data);
      if(rs.code == 0) {
        this.$message({
          type: "success",
          message: rs.message
        });
        this.inputUserName = "";
        this.inputPassWord = "";
        this.inputName = "";
        this.inputPhone = "";
        this.inputEmail = "";
        this.select2 = 0
        await this.getUsers();
      }
      else {
        this.$message({
          type: "error",
          message: rs.message
        });
      }
    },
    deleteUser(id) {
      this.$alert(`Do you want to delete user have id = ${id}`, "Warning!!!", {
        confirmButtonText: "OK",
        callback: async action => {
          this.action = action;
          if (action == "confirm") {
            let rs = await dataService.deleteUser({ id: id });
            if (rs.code == 0) {
              this.$message({
                type: "success",
                message: rs.message
              });
              await this.getUsers();
            } else {
              this.$message({
                type: "error",
                message: rs.message
              });
            }
          }
        }
      });
    }
  },
  computed: {
    validName() {
      return this.inputUserName != "" && this.inputPassWord != "" && this.inputName != "" && this.inputPhone != "" && this.inputEmail != "" && this.select2 != "";
    }
  }
};
</script>

<style scoped>
.box {
  width: auto;
  -webkit-box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.9) !important;
  -moz-box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.9) !important;
  box-shadow: 3px 1px 10px 9px rgba(0, 77, 77, 0.4) !important;
  border-radius: 6px;
  padding: 30px;
  margin: 15px;
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

@media only screen and (max-width: 600px) {
  .box {
    overflow-y: scroll;
    padding: 0;
  }
  #customers td {
    width: auto;
  }
}
</style>