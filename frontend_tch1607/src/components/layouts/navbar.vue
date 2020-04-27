<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background-color: rgba(0, 77, 77, 0.9);"
    >
      <router-link class="navbar-brand" tag="a" to="/">
        <img src="../../assets/logo.png" style="width: 80%; height:80%;"  alt />
      </router-link>
      <button
        v-on:click="handleClickNavBar"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        v-bind:aria-expanded="[isShow ? true : false]"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        v-bind:class="[isShow ? `collapse navbar-collapse show` : `collapse navbar-collapse`]"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <vs-button
              @click="handleClickActiveNav"
              color="rgba(0, 77, 77, 0.9)"
              type="filled"
              class="el-icon-menu"
              v-if="role < 3"
            ></vs-button>
          </li>
        </ul>
        <vs-button
          @click="handleClickActive"
          color="rgba(0, 77, 77, 0.9)"
          type="filled"
          class="el-icon-user-solid"
        ></vs-button>
      </div>
    </nav>
    <div id="parentx">
      <vs-sidebar
        position-right
        parent="body"
        default-index="1"
        color="primary"
        class="sidebarx"
        spacer
        v-model="active"
      >
        <div class="header-sidebar" slot="header">
          <vs-avatar size="70px" src="https://randomuser.me/api/portraits/men/85.jpg" />

          <h4>{{user.fullName}}</h4>
        </div>

        <vs-sidebar-item index="5" icon="verified_user">Configurations</vs-sidebar-item>
        <vs-sidebar-item index="6" icon="account_box">Profile</vs-sidebar-item>

        <div class="footer-sidebar" slot="footer">
          <vs-button icon="reply" color="danger" type="flat" v-on:click="logout">log out</vs-button>
          <!-- <vs-button icon="settings" color="primary" type="border"></vs-button> -->
        </div>
      </vs-sidebar>
    </div>
    <div id="parentx">
      <vs-sidebar
        parent="body"
        default-index="1"
        color="primary"
        class="sidebarx"
        spacer
        v-model="activeNav"
        
      >

        <vs-sidebar-item index="1" icon="home" v-if="role == 1">
          <router-link tag="a" to="/">Dashboard</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item index="2" icon="account_box" v-if="role == 1">
          <router-link tag="a" to="/users">Manage users</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item index="3" icon="supervised_user_circle" v-if="role == 1">
          <router-link tag="a" to="/class">Manage Allocated</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item index="5" icon="assessment" v-if="role < 3">
          <router-link tag="a" to="/listClass">Class list</router-link>
        </vs-sidebar-item>
      </vs-sidebar>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {
      isShow: false,
      isShowDropDown: false,
      active: false,
      activeNav: false,
      role: 0
    };
  },
  methods: {
    handleClickNavBar() {
      this.isShow = !this.isShow;
    },
    handleClickDropDown() {
      this.isShowDropDown = !this.isShowDropDown;
    },
    handleClickActive() {
      console.log(this.active);
      this.active = !this.active;
    },
    handleClickActiveNav() {
      this.activeNav = !this.activeNav;
    },
    logout() {
      sessionStorage.clear();
      window.location.reload();
    }
  },
  computed: {
    user() {
      return JSON.parse(sessionStorage.getItem("userInfo"));
    }
  },
  mounted() {
    this.role = JSON.parse(sessionStorage.getItem("userInfo"))['role']
  }
};
</script>

<style>
.buttonSideBar {
  border: 1px solid rgba(0, 77, 77, 0.9);
  background-color: rgba(0, 77, 77, 0.9);
  padding: 5px;
  border-radius: 5px;
}
.header-sidebar {
  text-align: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
h4 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
#parentx {
  border: 0px solid rgba(0, 0, 0, 0) !important;
  border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
  border-radius: 0px !important;
}
</style>