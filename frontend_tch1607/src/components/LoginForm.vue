<template>
<body>
  <div class="crossfade">
    <figure></figure>
    <figure></figure>
    <figure></figure>
  </div>
  <div class="login-box">
    <div class="login-snip">
      <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
      <label for="tab-1" class="tab">Login</label>
      <input id="tab-2" type="radio" name="tab" class="sign-up" />
      <label for="tab-2" class="tab"></label>
      <form class="login-space" @submit.prevent="login">
        <div class="login">
          <div class="group">
            <label for="user" class="label">Username</label>
            <input
              id="user"
              type="text"
              class="input"
              v-model="username"
              placeholder="Enter your username"
            />
          </div>
          <div class="group">
            <label for="pass" class="label">Password</label>
            <input
              id="pass"
              type="password"
              class="input"
              data-type="password"
              placeholder="Enter your password"
              v-model="password"
            />
          </div>
          <div class="group">
            <input type="submit" class="button" value="Sign In" />
          </div>
          <transition>
            <el-alert v-if="message !=''" title="error alert" type="error" v-bind:description="message" show-icon></el-alert>
          </transition>
          <div class="hr"></div>
        </div>
      </form>
    </div>
  </div>
</body>
</template>

<script>
import dataService from "../network/dataService";
import navbar from "./layouts/navbar.vue";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      message: ""
    };
  },
  methods: {
    async login() {
      let rs = await dataService.login({
        username: this.username,
        password: this.password
      });
      if (rs.code == 0) {
        sessionStorage.setItem("token", rs.token);
        sessionStorage.setItem("userInfo", JSON.stringify(rs.data));
        this.$router.push({ name: "Home" });
      } else {
        this.message = rs.message;
      } 
    }
  },
  components: {
    navbar
  }
};
</script>

<style scoped>
.crossfade > figure {
  animation: imageAnimation 15s linear infinite 0s;
  backface-visibility: hidden;
  background-size: cover;
  background-position: center center;
  color: transparent;
  height: 100%;
  left: 0px;
  opacity: 0;
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 0;
}
.crossfade > figure:nth-child(1) {
  background-image: url(../assets/loginBackground.jpg);
}

.crossfade > figure:nth-child(2) {
  animation-delay: 5s;
  background-image: url(../assets/background2.jpg);
}
.crossfade > figure:nth-child(3) {
  animation-delay: 10s;
  background-image: url(../assets/background3.jpg);
}
@keyframes imageAnimation {
  0% {
    animation-timing-function: ease-in;
    opacity: 0;
  }
  8% {
    animation-timing-function: ease-out;
    opacity: 0;
  }
  17% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
/* body {
  background-image: url(../assets/loginBackground.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
} */
.login-box {
  width: 100%;
  margin: auto;
  max-width: 30%;
  min-height: 80%;
  position: relative;
  top: 75px;
  border-radius: 25px;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.login-snip {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 90px 70px 50px 70px;
  border-radius: 25px;
  background: rgba(0, 77, 77, 0.9);
}

.login-snip .login,
.login-snip .sign-up-form {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: all 0.4s linear;
}

.login-snip .sign-in,
.login-snip .sign-up,
.login-space .group .check {
  display: none;
}

.login-snip .tab,
.login-space .group .label,
.login-space .group .button {
  text-transform: uppercase;
}

.login-snip .tab {
  font-size: 22px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 0 15px 10px 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
}

.login-snip .sign-in:checked + .tab,
.login-snip .sign-up:checked + .tab {
  color: #fff;
  border-color: #1161ee;
}

.login-space {
  min-height: 345px;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.login-space .group {
  margin-bottom: 15px;
}

.login-space .group .label,
.login-space .group .input,
.login-space .group .button {
  width: 100%;
  color: #fff;
  display: block;
}

.login-space .group .input,
.login-space .group .button {
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
}

.login-space .group input[data-type="password"] {
  text-security: circle;
  -webkit-text-security: circle;
}

.login-space .group .label {
  color: #aaa;
  font-size: 12px;
}

.login-space .group .button {
  background: #1161ee;
}

.login-space .group label .icon {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
}

.login-space .group label .icon:before,
.login-space .group label .icon:after {
  content: "";
  width: 10px;
  height: 2px;
  background: #fff;
  position: absolute;
  transition: all 0.2s ease-in-out 0s;
}

.login-space .group label .icon:before {
  left: 3px;
  width: 5px;
  bottom: 6px;
  transform: scale(0) rotate(0);
}

.login-space .group label .icon:after {
  top: 6px;
  right: 0;
  transform: scale(0) rotate(0);
}

.login-space .group .check:checked + label {
  color: #fff;
}

.login-space .group .check:checked + label .icon {
  background: #1161ee;
}

.login-space .group .check:checked + label .icon:before {
  transform: scale(1) rotate(45deg);
}

.login-space .group .check:checked + label .icon:after {
  transform: scale(1) rotate(-45deg);
}

.login-snip .sign-in:checked + .tab + .sign-up + .tab + .login-space .login {
  transform: rotate(0);
}

.login-snip .sign-up:checked + .tab + .login-space .sign-up-form {
  transform: rotate(0);
}

*,
:after,
:before {
  box-sizing: border-box;
}

.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

.hr {
  height: 2px;
  margin: 60px 0 50px 0;
  background: rgba(255, 255, 255, 0.2);
}

.foot {
  text-align: center;
}

.card {
  width: 500px;
  left: 100px;
}

::placeholder {
  color: #b3b3b3;
}

@media only screen and (max-width: 600px) {
.login-box {
  width: 100%;
  margin: auto;
  max-width: 300px;
  min-height: 80%;
}
.login-snip {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 90px 70px 50px 70px;
  border-radius: 25px;
  background: rgba(0, 77, 77, 0.9);
}
}
</style>