<template>
  <div class="login_contents">
    <form @submit.prevent="">
    <h2 class="title" v-if="isLoginPage">登入</h2>
    <h2 class="title" v-else >註冊</h2>
    <div class="account">
      <label for="account">帳號</label>
      <input type="email" id="account" placeholder="請用email格式: test1@example.com"/>
    </div>
    <div class="password">
      <label for="password">密碼</label>
      <input type="password" id="password" placeholder="4~12位英數密碼"/>
    </div>
    <div class="password" v-if="!isLoginPage">
      <label for="password2">確認密碼</label>
      <input type="password" id="password2" />
    </div>
    <p v-if="isLoginPage" class="sweet_inform">還沒有帳戶? 立即前往註冊，以使用祝福牆功能!</p>
    <p v-else class="sweet_inform">註冊完即可立即使用，無須其他驗證!</p>
    <div class="buttons">
      <button @pointerdown.prevent="goToPage" type="button">前往註冊</button>
      <button>登入</button>
    </div>
  </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  setup() {
    const isLoginPage = ref(true);
  
    function goToPage(){
      isLoginPage.value = !isLoginPage.value;
      document.getElementById('account').focus();
    }

    return {
    isLoginPage,
    goToPage
  }
  },
}
</script>


<style scoped>
h2 {
  margin: 0;
}

.title {
  background-color: aqua;
  width: 100%;
  text-align: center;
  border-radius: 10px;
}

.account,
.password {
  padding: 2rem 0rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .account,
.password > * {
  text-align: center;
} */

.login_contents {
  margin: 1rem 2rem;
  font-size: 1.5rem;
  box-sizing: border-box;
  background-color: white;
  /* height: 50vh; */
  max-width: 1200px;
}

label {
  display: inline-block;
  height: 100%;
  /* margin-right: 1rem; */
  padding-right: 1rem;
  width: 20%;
}

input[type="email"],
input[type="password"] {
  padding: 0.8rem;
  border: 1px solid black;
  box-sizing: border-box;
  /* display: inline-block; */
  width: 80%;
}

.buttons {
  margin: 3rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.buttons > button {
  margin: 3rem 0.5rem;
  font-size: 1.5rem;
  flex: 1 1 auto;
  border-radius: 1rem;
}

.sweet_inform{
  color: darkblue;
  font-weight: 900;
}

@media(min-width:1200px) {
  .login_contents{
    /* box-sizing: border-box; */
    position: absolute;
    width: 1200px;
    margin: 0;
    padding: 2rem;
    left: 50%;
    top:50%;
    border-radius: 2rem;
    transform: translate(-50%,-50%);
  }
}
</style>