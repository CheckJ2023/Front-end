<template>
  <Navbar />
  <div class="container">
    <div id="header">
      <h1>Accueillir</h1>
      <p>The Bookstore Web</p>
    </div>
  </div>
  <!-- 卡片資料 -->
  <div v-for="p in data" class="card">
    <div class="card-image"><img :src="p.photoUrl" /></div>
  <!-- tag標籤 -->
    <div class="tags">
      <div class="tag-container">
        <div class="tag">
          <div class="tag-side tag-2-side">
            <div class="tag-text tag-2-text">
              {{ p.storeName }}:{{ p.title }}
              <div class="rule-diagonal"></div>
            </div>
          </div>

          <div class="tag-side tag-2-side is-back">
            <div class="tag-text tag-2-text">
              {{ p.description }}
              <div class="rule-diagonal"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import NavbarVue from '../components/Navbar.vue';

export default {
  data() {
    return {
      username: "",
      toastMessage: "",
      isShowToast: false,
      isShowForm: false, // 控制新增表單是否要出現

      // 新增商品用的資料結構
      newProduct: {
        photoUrl: "",
        title: "",
        description: "",
        price: 0,
        storeUrl: "",
        storeName: "",
      },
      // 存放商品資訊
      data: [],
    };
  },
  // Vue要使用的方法
  methods: {
    // 送出要新增的商品資料
    onSend() {
      axios.post("/product", this.newProduct).then((response) => {
        // 打API成功
        if (response.status == 200 && response.data.code == 0) {
          // alert('新增資料成功');
          this.showToast("新增資料成功");

          // 將新增的資料丟給畫面顯示
          this.data.push(JSON.parse(JSON.stringify(this.newProduct)));
        } else {
          alert("新增資料失敗");
        }
      });
      // 隱藏對話框
      this.isShowForm = false;
    },
    showToast(msg) {
      this.isShowToast = true;
      this.toastMessage = msg;

      setTimeout(() => {
        this.isShowToast = false;
      }, 2000);
    },
  },
  // 這個方法會網頁載入完畢後會自動被呼叫
  mounted() {
    // let account = localStorage.getItem('login');
    //  if(account !== 'cafe') {location.href = '/'; return;}

    // 取得網址列參數
    const queryString = window.location.search;
    // 解析參數列
    const parameters = new URLSearchParams(queryString);
    // 取得使用者名稱
    this.username = parameters.get("username");

    // 打API要商品資訊
    axios.get("/prod").then((response) => {
      // 處理API的response
      console.log(response);

      if (response.status == 200) {
        // API呼叫成功
        if (response.data.code == 0)
          // 取的資料成功
          this.data = response.data.data; // 將商品資訊存到變數內
        else this.data = []; // 清空資料
      }
    });
  },
};
</script>

<style scoped>
/* .card{
  display:flex;
  flex-direction:column;
  width:250px;
  margin-bottom:20px;
  margin-left: 15px;
}

.card-image{
  width:250px;
  height:350px;
}
.card-image>img{
  width:250px;
  height:350px;
  border-radius:40px;
  object-fit:cover;
  object-position:bottom;
} */

.card-text {
  margin: auto;
  height: 150px;
  width: 200px;
  background-color: #365443;
  color: rgb(205, 200, 200);
  padding: 10px;
}
.card-title {
  font-size: 30px;
  margin-bottom: 20px;
  margin-top: 5px;
}
.card-body {
  font-size: 1.25rem;
}
.card-price {
  width: 50px;
  height: 50px;
  background-color: #5d2727;
  color: #fff;
  margin-left: auto;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit {
  background-color: rgb(24, 155, 39);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 16px;
  height: 40px;
  margin-top: 20px;
  /* outline: 0;  */
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: rgb(16, 89, 46);
}

.btn-group {
  display: flex;
  gap: 20px;
}

button {
  --border: 3px;
  --slant: 0.7em;
  --color: rgb(220, 58, 33);
  height: 50px;
  width: 100px;
  font-size: 18px;
  padding: auto;
  margin: auto;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: var(--color);
  background: linear-gradient(to bottom left, var(--color) 50%, #0000 50.1%) top
      right,
    linear-gradient(to top right, var(--color) 50%, #0000 50.1%) bottom left;
  background-size: calc(var(--slant) + 1.3 * var(--border))
    calc(var(--slant) + 1.3 * var(--border));
  background-repeat: no-repeat;
  box-shadow: 0 0 0 200px inset var(--s, #0000),
    0 0 0 var(--border) inset var(--color);
  clip-path: polygon(
    0 0,
    calc(100% - var(--slant)) 0,
    100% var(--slant),
    100% 100%,
    var(--slant) 100%,
    0 calc(100% - var(--slant))
  );
  transition: color var(--t, 0.3s), background-size 0.3s;
}
button:focus-visible {
  outline-offset: calc(-1 * var(--border));
  outline: var(--border) solid #000c;
  clip-path: none;
  background-size: 0 0;
}
button:hover,
button:active {
  background-size: 100% 100%;
  color: #fff;
  --t: 0.2s 0.1s;
}
button:active {
  --s: #0005;
  transition: none;
}





*, *:after, *:before {
  box-sizing: border-box;
}

.tags {
    padding-left: 30px;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    justify-content: center;
    display: -webkit-box;
    display: flex;
}

/* Shared */
.tag-container {
    width: 200px;
    height: 300px;
    margin: 20px;
    position: relative;
    -webkit-perspective: 300px;
    perspective: 300px;
}

.tag {
    width: 70%;
    height: 70%;
    position: absolute;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: -webkit-transform 1s;
    transition: -webkit-transform 1s;
    transition: transform 1s;
    transition: transform 1s, -webkit-transform 1s;
}

.tag-container:hover .tag {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.tag-side {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
}

.tag-side.is-back {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    z-index: 2;
}

.tag-text {
    width: 100%;
    padding: 0 20px;
    color: #222;
    font: 20px 'Sacramento', cursive;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}


/* Tag 2 */
.tag-2-side:before,
.tag-2-side:after {
    content: " ";
    background: #b6dfde;
    height: 50px;
    position: absolute;
    top: 0;
    left: 50px;
    right: 50px;
    -webkit-transform: skew(-45deg) translate3d(0, 0, 0);
    transform: skew(-45deg) translate3d(0, 0, 0);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}

.tag-2-side.is-back:before,
.tag-2-side.is-back:after {
    background: #47ada0;
}

.tag-2-side:after {
    -webkit-transform: skew(45deg);
    transform: skew(45deg);
}

.tag-2-text:before {
    content: " ";
    background: #fff;
    width: 27px;
    height: 27px;
    border: 6px solid #47ada0;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 50%;
    z-index: 1;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
}

.tag-2-side.is-back .tag-2-text:before {
    border-color: #b6dfde;
}

.tag-2-text {
    background: #b6dfde;
    margin-top: 50px;
    padding-bottom: 30px;
}

.tag-2-side.is-back .tag-2-text {
    background: #47ada0;
}


/* Extras */
.rule-shape {
    width: 100%;
    color: #fff;
    font-size: 34px;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    align-self: flex-end;
}

.rule-shape:before,
.rule-shape:after {
    content: " ";
    background: #fff;
    height: 1px;
    margin-bottom: 8px;
    display: block;
    -webkit-box-flex: 2;
    flex-grow: 2;
}

.rule-shape:before {
    margin-right: 6.25px;
}

.rule-shape:after {
    margin-left: 6.25px;
}

.rule-red {
    color: #e44f47;
}

.rule-red:before,
.rule-red:after {
    background: #e44f47;
}

.rule-diagonal {
    background: -webkit-repeating-linear-gradient(
        45deg,
        #e44f47,
        #e44f47 7px,
        transparent 7px,
        transparent 14px,
        #fff 14px,
        #fff 21px,
        transparent 21px,
        transparent 28px
    );
    background: repeating-linear-gradient(
        45deg,
        #e44f47,
        #e44f47 7px,
        transparent 7px,
        transparent 14px,
        #fff 14px,
        #fff 21px,
        transparent 21px,
        transparent 28px
    );
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
}

/**************** Prod **************/

#header{
  margin:0;
  padding: 0;
}
#header>h1{
  text-align:center;
  font-size:50px;
  filter: opacity(0.7);
}
#header>p{
  text-align:center;
  margin: 20px;
  font-size:30px;
  filter: opacity(0.5);
  font-style:italic;
}

.container{
  background-image: url("https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80");
  width:100vw;
  height: 100vh;
  display:flex;
  justify-content:space-around;
  flex-wrap:wrap;

}


.card{
  display:flex;
  flex-direction:column;
  border: 1px solid;
  background-color: #080710;
  width:300px;
  height: 500px;
  margin-bottom:20px;
  margin-left: 15px;
}

.card-image{
  width:250px;
  height:350px;
}

.card-image>img{
  width:250px;
  height:350px;
  border-radius:40px;
  object-fit:cover;
  object-position:bottom;
}
</style>
