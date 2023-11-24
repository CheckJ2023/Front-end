<template>
<div class="body">
  <div class="toast" v-if="isShowToast">{{ toastMessage }}</div>
  <h1>SuperAdmin</h1>
  <h2>商品管理頁</h2>
<div class="build-product">
  <div>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>圖片連結</th>
          <th>書籍名稱</th>
          <th>內容描述</th>
          <th>預定</th>
          <th>屬性標籤</th>
          <th>作者</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p, index in data">
          <td data-title="編號">{{ p.id }}</td>
          <td data-title="圖片連結" class="addr-col">
            <div v-if="!dataEdiorMode[index]">{{ p.photoUrl }}</div>
            <input v-else class="editor-input" v-model="tempData[index].photoUrl" />
          </td>
          <td data-title="書籍名稱">
            <div v-if="!dataEdiorMode[index]">{{ p.title }}</div>
            <input v-else class="editor-input" v-model="tempData[index].title" />
          </td>
          <td data-title="內容描述">
            <div v-if="!dataEdiorMode[index]">{{ p.description }}</div>
            <input v-else class="editor-input" v-model="tempData[index].description" />
          </td>
          <td data-title="預定">
            <div v-if="!dataEdiorMode[index]">{{ p.price }}</div>
            <input v-else class="editor-input" v-model="tempData[index].price" />
          </td>
          <td data-title="屬性標籤">
            <div v-if="!dataEdiorMode[index]">{{ p.storeUrl }}</div>
            <input v-else class="editor-input" v-model="tempData[index].storeUrl" />
          </td>
          <td data-title="作者">
            <div v-if="!dataEdiorMode[index]">{{ p.storeName }}</div>
            <input v-else class="editor-input" v-model="tempData[index].storeName" />
          </td>
          <td v-if="!dataEdiorMode[index]" class="select">
            <a class="button" @click="onEdit(index)">編輯</a>
            <a class="button" @click="onDelete(index)">刪除</a>
          </td>
          <td v-else class="select">
            <a class="button-cancel" @click="onCancelEdit(index)">取消</a>
            <a class="button-ok" @click="onOKEdit(index)">確定</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<!-- 再次確認是否刪除 -->
<div v-if="isShowModel" class="model-container">
  <div class="model-title">確定要刪除資料嗎?</div>
  <div class="model-content">
    <img class="model-icon" src="https://static.vecteezy.com/system/resources/previews/000/440/213/non_2x/question-mark-vector-icon.jpg" />
    <div class="model-message">確定要刪除資料嗎?<br>確定要刪除資料嗎?<br><br>請選擇!!!</div>
  </div>
  <div class="model-content">
    <div class="model-cancel" @click="isShowModel = false">取消</div>
    <div class="model-ok" @click="confirmDelete()">確定</div>
  </div>
</div>

    <div class="add-btn" @click="isShowForm = true">
      <img src="plus.svg" style="width: 100%;" />
    </div>
  
    <div class="toast" v-if="isShowToast">{{ toastMessage }}</div>

    <div v-if="isShowForm"></div>

    <!-- 輸入用彈出式表單 -->
    <div class="form" v-if="isShowForm">
      <div class="title">新增商品</div>
      <div class="input-container ic1">
        <input id="photo_url" class="input" type="text" placeholder="" v-model="newProduct.photoUrl" />
        <div class="cut"></div>
        <label for="photo_url" class="placeholder">圖片連結</label>
      </div>
      <div class="input-container ic1">
        <input id="title" class="input" type="text" placeholder="" v-model="newProduct.title" />
        <div class="cut cut-short"></div>
        <label for="title" class="placeholder">書籍名稱</label>
      </div>
      <div class="input-container ic1">
      <input id="price" class="input" type="text" placeholder="" v-model="newProduct.storeName" />
      <div class="cut cut-short"></div>
      <label for="price" class="placeholder">作者</label>
      </div>
      <div class="input-container ic1" style="height: 170px;">
        <input id="description" class="input" type="textarea" placeholder="" v-model="newProduct.description" />
        <div class="cut cut-short"></div>
        <!-- <label for="description" class="placeholder">內容描述</lable> -->
      </div>

      <div class="btn-group">
        <button type="text" class="submit" @click="isShowForm = false">取消新增</button>
        <button type="text" class="submit" @click="onSend()">確定新增</button>
      </div>
    </div>


</div>

</template>



<script>
import axios from 'axios';
export default{
      data() {
        return {
          toastMessage: '',
          isShowToast: false,       
          isShowForm:false,         // 控制新增的顯示
          isShowModel: false,       // 控制對話盒的顯示
          prepareOnDeleteIndex: -1, // 預計要刪除的資料index

          data: [], // 存放商品清單的變數
          tempData: [], // 存放編輯後的資料用
          dataEdiorMode: [],
          newProduct:[],
        }
      },
      // Vue要使用的方法
      methods: {
        onEdit(index) {
          this.dataEdiorMode[index] = true; // 進入編輯模式

          // 複製資料到編輯用的tempData陣列內
          this.tempData[index] = JSON.parse(JSON.stringify(this.data[index]));
        },
        onDelete(index) {
          this.isShowModel = true;
          this.prepareOnDeleteIndex = index; // 紀錄準備要刪除的index
        },
        onCancelEdit(index) {
          this.dataEdiorMode[index] = false; // 離開編輯模式
        },
        // 確定編輯
        onOKEdit(index) {
        
          // 呼叫Update product API
          axios.put('http://localhost/product', this.tempData[index])
            .then((response) => {
              if(response.status == 200 && response.data.code == 0) {// 更新成功
                // 更新原本的資料畫面
                this.data[index] = this.tempData[index];

                // 成功再離開編輯模式
                this.onCancelEdit(index);

                this.showToast('更新 ' + this.data[index].title + ' 成功');
              } else {
                this.showToast('更新 ' + this.data[index].title + ' 失敗');
              }
            });
        },
        confirmDelete() {
          // 呼叫刪除商品的API
          axios.delete('/product/' + this.data[this.prepareOnDeleteIndex].id)
            .then((response) => {
              if(response.status == 200 && response.data.code == 0) {
                this.showToast('刪除 ' + this.data[this.prepareOnDeleteIndex].id + ' 成功');

                // 從網頁上移除已經刪除的商品資料
                this.data.splice(this.prepareOnDeleteIndex, 1);
              } else {
                this.showToast('刪除 ' + this.data[this.prepareOnDeleteIndex].id + ' 失敗');
              }

              this.isShowModel = false;
              this.prepareOnDeleteIndex = -1; // 紀錄準備要刪除的index
            });
        },
        showToast(msg) {
          this.isShowToast = true;
          this.toastMessage = msg;

          setTimeout(() => {
            this.isShowToast = false;
          }, 2000);
        }
      },
      // 這個方法會網頁載入完畢後會自動被呼叫
      mounted() {
        // 打API要商品資訊
        axios.get('http://localhost/product')
          .then((response) => {
            // 處理API的response
            console.log(response);

            if(response.status == 200) { // API呼叫成功 
              if(response.data.code == 0) { // 取的資料成功
                this.data = response.data.data; // 將商品資訊存到變數內
                console.log(this.data);
              }
              else
                this.data =[];  // 清空資料
            }
          });
      }
    }

 </script>

<style scoped>
*{
  padding: 0;
  margin: 20px;
}

.body, tbody {
  padding: 20px;

  width: fit-content;
  background-color: #F0F0F0; 
}

h1,h2 {
  text-align: center;
  font-weight: 300;
  display: flex;
}

.build-product{
  background-color: #fff;
}

div{
  display: flex;
  align-items: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th{
  color: #0a3251;
  font-weight: bold;
  margin-right: 10px;
}


thead th {
  background-color: #202932;
  color: #fff;
  text-align: center;
  padding:10px;
}
tr {
  padding-bottom: 50px;
  border-bottom: 1px solid #9d9fa0;
  background-color: rgb(249, 240, 227);
  
}

td {
  max-width: 250px;
  text-align: center;
  word-break: break-all;
}

.addr-col {
  max-width: 250px;
  word-break: normal;
  overflow: auto;
  white-space: nowrap;
}


.select {
  padding-bottom: 20px;
  
}

.select a {
  margin-right: 5px;
  margin-bottom: 5px;
  min-width: 50px;
  text-align: center;
  cursor: pointer;
}

.select a:hover {
  background-color: yellowgreen;
}

button {
  font-size: 15px;
  padding: 10px;
  background-color: #003060;
  color: #fff;
  border-radius: 5px;
  border: white;
  cursor: pointer;
}



.button {
  line-height: 1;
  display: inline-block;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  background-color: #4b908f;
}

.button-cancel {
  line-height: 1;
  display: inline-block;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  background-color: #4b908f;
  background-color: brown;
}

.button-ok {
  line-height: 1;
  display: inline-block;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  background-color: #4b908f;
  background-color: midnightblue;
}

.button-cancel:hover {
  background-color: brown;
}

.button-ok:hover {
  background-color: midnightblue;
}



.toast {
  background-color: #00aa00;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 30px;
  position: fixed;
  top: 10px;
  z-index: 2;
  left: 0;
  right: 0;
  margin: auto;
}



/* 以下都是對話盒樣式 */
.model-container {
  display: flex;
  position: fixed;
  width: 400px;
  border-radius: 20px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  height: fit-content;
  flex-direction: column;
  background-color: white;
  padding-bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
}

.model-title {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 20px;
  font-size: 1.5em;
  font-weight: 800;
}

.model-content {
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 20px;
  gap: 20px;
  justify-content: center;
}

.model-icon {
  width: 32px;
  height: 32px;
  margin: 20px;
  margin-right: 0px;
  background-color: #e22756;
}

.model-message {
  width: 100%;
  color: #202932;
}

.model-cancel, .model-ok {
  width: 120px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;
  color: #fff;
  border: solid ;
}

.model-cancel {
  background-color: #e6426b;
}

.model-ok {
  background-color: rgb(37, 85, 175);
}

.editor-input {
  width: 80%;
  height: 30px;
  padding: 5px;
  border: none;
  border-radius: 5px;
}


/*新增按鈕 */

.add-btn {
  width: 50px;
  height: 50px;
  max-height: 50px;
  max-width: 50px;
  background-color:rgb(16, 89, 46);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  padding: 0;
  padding-bottom: 2px;
  text-decoration: none;
  gap: 0;
  border: 0;
  
  border-radius: 50px;
  position: fixed;
  right: 20px;
  bottom: 20px;

  z-index: 1;
}

.add-btn:hover {
  background-color: rgb(16, 89, 46);
}

.toast {
  background-color: red;
  color: #eee;
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  position: fixed;
  top: 40px;
  z-index: 2;
}


.form {
  display:unset;
 
  border-radius: 20px;
  box-sizing: border-box;
  height: 550px;
  width: 320px;
  padding-right: 50px;


}

.title {
  color: #970C0A;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
}


.input-container {
  height: 40px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 30px;
}

.input-container ic2 {
  margin-top: 50px;
}



.input {
  background-color: #eaeaee;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #5d2727;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 10;
  width: 100%;
}

.cut {
  background-color: #bfc2e7;
  border-radius: 10px;
  height: 30px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  
}



.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #a5a5a8;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 35px;
  transition: transform 200ms, color 200ms;
  top: 15px;
  font-size: 0.8em;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.btn-group {
  display: flex;
  gap: 20px;
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

</style>