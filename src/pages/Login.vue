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

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0px;
  
  box-sizing: border-box;
}
.backgroundLogin {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("src/assets/indbg.jpg");
  margin: auto;
  display: Flex;
  justify-content: center;
}
.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
}
.shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
}
form {
  height: 500px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 10px 35px;
}
form * {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  color:#000;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #9d7d7d;
}
button {
  margin-top: 20px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}

.btn {
  display: flex;
  gap: 30px;
}

.c-btn {
  height: 40px;
  padding: 0;
  font-size: 14px;
  display: flex;
  color: rgb(216, 227, 70);
  background-color: grey;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
}

.login-failed {
  color: red;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -10px;
}

.social {
  margin-top: 30px;
  display: flex;
}
.social div {
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}
.social .fb {
  margin-left: 25px;
}
.social i {
  margin-right: 4px;
}


</style>
