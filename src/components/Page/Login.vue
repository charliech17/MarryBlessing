<template>
  <base-dialog
    :show="response['allAuthInform'].error !== null"
    title="Error"
    @close="handleError"
    >{{ response["allAuthInform"].error }}</base-dialog
  >
  <base-dialog
    :show="loginInfo.createSuccess"
    title="Success"
    @close="handleSuccess"
    >{{ "註冊成功! 請至登入頁面登入帳號" }}</base-dialog
  >
  <base-dialog
    :show="loginInfo.loginSuccess"
    title="Success"
    @close="handleSuccess"
    >{{ "登入成功!" }}</base-dialog
  >
  <base-dialog :show="loginInfo.isLoading" fixed title="Authenticating...">
    <base-spinner></base-spinner>
  </base-dialog>
  <div class="login_contents">
    <form @submit.prevent="submitForm">
      <h2 class="title" v-if="isLoginPage">登入</h2>
      <h2 class="title signup" v-else>註冊</h2>

      <div class="account">
        <label for="account">帳號</label>
        <input
          type="email"
          id="account"
          placeholder="請用email格式: test1@example.com"
          v-model.trim="loginInfo.account"
        />
      </div>
      <p class="warning" v-if="loginInfo.accountInvalid">
        帳號請用email格式(123@example.com)
      </p>

      <div class="password">
        <label for="password">密碼</label>
        <input
          type="password"
          id="password"
          placeholder="4~12位英數密碼"
          v-model.trim="loginInfo.password"
        />
      </div>
      <p class="warning" v-if="loginInfo.passwordInvalid">密碼需至少6個字</p>

      <div class="password" v-if="!isLoginPage">
        <label for="password2">確認密碼</label>
        <input
          type="password"
          id="password2"
          v-model="loginInfo.confirmPassword"
        />
      </div>
      <p class="warning" v-if="loginInfo.confirmInvalid">密碼不相同</p>
      <p class="warning" v-if="response['allAuthInform'].error">
        {{ response["allAuthInform"].error }}
      </p>

      <p v-if="isLoginPage" class="sweet_inform">
        還沒有帳戶? 立即前往註冊，以使用祝福牆功能!
      </p>
      <p v-else class="sweet_inform">註冊完即可立即使用，無須其他驗證!</p>
      <div class="buttons">
        <button @pointerdown.prevent="goToPage" type="button">
          前往{{ isLoginPage ? "註冊" : "登入" }}
        </button>
        <button>{{ isLoginPage ? "登入" : "註冊" }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import getNewEmail from "../../hooks/getNewEmail.js";
import getAllDatabase from "../../hooks/firebase/getAllDatabase.js";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoginPage = ref(true);
    const loginInfo = reactive({
      account: "",
      password: "",
      confirmPassword: "",
      accountInvalid: false,
      passwrodInvalid: false,
      confirmInvalid: false,
      isLoading: false,
      createSuccess: false,
      loginSuccess: false,
    });

    const response = computed(() => store.getters["auth/allAuthInform"]);
    console.log(response.value["allAuthInform"]);

    function goToPage() {
      isLoginPage.value = !isLoginPage.value;
      document.getElementById("account").focus();
    }

    async function submitForm() {
      Object.assign(loginInfo, {
        accountInvalid: false,
        passwrodInvalid: false,
        confirmInvalid: false,
        isLoading: true,
      });

      // store.dispatch("auth/updateError", null);

      if (loginInfo.account === "" || !loginInfo.account.includes("@")) {
        Object.assign(loginInfo, { accountInvalid: true, isLoading: false });
        return;
      }

      if (!isLoginPage.value && loginInfo.password.length < 6) {
        Object.assign(loginInfo, { passwordInvalid: true, isLoading: false });
        return;
      }

      if (
        loginInfo.password !== loginInfo.confirmPassword &&
        !isLoginPage.value
      ) {
        Object.assign(loginInfo, { confirmInvalid: true, isLoading: false });
        return;
      }

      try {
        await store.dispatch(`auth/setUser`, {
          email: loginInfo.account,
          password: loginInfo.password,
          isSignin: isLoginPage.value,
        });
      } catch (err) {
        console.log(err);
      }

      if (response.value["allAuthInform"].error === null) {
        if (isLoginPage.value) {
          loginInfo.loginSuccess = true;
          localStorage['email'] = loginInfo.account;
        } else {
          loginInfo.createSuccess = true;
        }
      }

      loginInfo.isLoading = false;
    }

    //檢查

    const { AllFirebasDatbase, thisDatabaseEmail } = getAllDatabase(store);

    function handleSuccess() {
      if (isLoginPage.value) {
        loginInfo.loginSuccess = false;
        localStorage['idToken'] =response.value["allAuthInform"].idToken ;

        for (const database in AllFirebasDatbase.value) {
          if (database.split("_")[1] === thisDatabaseEmail.value) {
            store.dispatch('auth/updateState',{name:'isNewman',value:true});
            //存入localStorage
            localStorage['isNewman'] = true;

            router.replace("/newMan/yourwedding");
            return;
          }
        }

        router.replace("/identity");
        return;
      }

      loginInfo.createSuccess = false;
      isLoginPage.value = !isLoginPage.value;
    }

    function handleError() {
      store.dispatch("auth/updateError", null);
      document.getElementById("account").focus();
    }

    return {
      isLoginPage,
      goToPage,
      submitForm,
      loginInfo,
      response,
      handleSuccess,
      handleError,
    };
  },
};
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

.signup {
  background-color: rgb(255, 0, 128);
  color: white;
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
  max-width: 250px;
}

.sweet_inform {
  color: darkblue;
  font-weight: 900;
}

/* .warning {
  color: brown;
  margin: 0;
  text-align: end;
  font-size: 5px;
} */
@media (min-width: 500px) {
  .buttons > button {
    font-size: 2rem;
  }
}

@media (min-width: 1200px) {
  .login_contents {
    box-sizing: border-box;
    position: absolute;
    width: 1200px;
    margin: 0;
    padding: 1rem;
    border-radius: 2rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .buttons {
    margin: 0;
  }

  .buttons > button {
    margin: 0 2rem;
  }

  /* .warning {
    font-size: 2rem;
  } */
}
</style>