<template>
  <div class="backgroundLogin">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form>
      <h3>Login Here</h3>

      <label for="username">Username</label>
      <input
        v-model="username"
        type="text"
        name="username"
        placeholder="username"
        id="username"
      />

      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        name="code"
        placeholder="Password"
        id="password"
      />

      <div v-if="isShowLoginError" class="login-failed">登入失敗</div>

      <button @click.prevent="login()">Log In</button>
      <!-- 以下為變數的替換語法 -->
      <!-- <ButtonNo1 message="登入" @click.prevent="login()" /> -->

      <div class="social">
        <div class="go"><i class="fab fa-google"></i> Google</div>
        <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
      </div>

      <div class="btn">
        <button class="c-btn">Sign up</button>
        <button class="c-btn">Forget Password</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import ButtonNo1 from "../components/buttonNo1.vue";

export default {
  data() {
    return {
      // count:0,
      // message:'Hello Vue',
      // test:'Hi , Friend',
      username: "",
      password: "",
      isShowLoginError: false,
    };
  },
  // Vue要使用的方法
  methods: {
    testClick() {
      //alert('Hi');  彈出視窗
      this.test = "John";
    },
    // Vue登入方法
    login() {
      console.log("login");
      console.log("username=" + this.username);
      console.log("password=" + this.password);
      // 串接登入API
      axios
        .get(
          "http://localhost:80/login?username=" +
            this.username +
            "&password=" +
            this.password
        )
        .then((response) => {
          console.log(response);
          // 處理API回應
          if (response.status == 200) {
            console.log("呼叫API成功");
            if (response.data.code > 0) {
              console.log(response.data.code);
              console.log("登入失敗:" + response.data.message);
              this.isShowLoginError = true;
            }
            else {
              console.log(response.data.code);
              console.log("登入成功");
              // localStorage.setItem('login',this.username);
              console.log(response.data.account);
              location.href = "./prod.html"; //跳轉網頁
            }
          }
        });
    },
  },
  components: { ButtonNo1 },
};
</script>


