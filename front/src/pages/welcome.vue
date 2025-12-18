<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import user from '@/stores/userStore.js';
import { useNotif } from '@orion.ui/orion';

let router = useRouter()
let login = ref()
let password = ref()


function signIn () {
  let logUserIn = user.signIn(login.value, password.value)
  console.log(login.value, password.value);
  

  if (!logUserIn) { 
    console.log(logUserIn);
    return useNotif.danger('Неправильный логин или пароль') 
  }

  $cookies.set('mapsLogin', true)  
  router.push({ name: 'maps' })
}


onMounted(() => {
  let session = $cookies.get('mapsLogin')
  if (session) { router.push({ name: 'maps' }) }
})

</script>


<template>
<section class="wlcome flex--row-cc">
  <div class="wlcome--form flex--col-cc">
    <h2 class="wlcome--title">Добро пожаловать!</h2>
    <o-input v-model="login" label="Логин" class="wlcome--login"></o-input>
    <o-password v-model="password" label="Пароль" class="wlcome--password"></o-password>
    <o-button class="wlcome--signin" @click="signIn">Войти</o-button>
  </div>
</section>
</template>


<style scoped>
.wlcome {
  width: 100vw;
  height: 100vh;
}

.wlcome--form {
  padding: 40px;
  background: rgba(255, 255, 255, .2);
  border-radius: 10px;
  align-items: stretch;
  gap: 5px;
}

.wlcome--title {
  margin: 0; padding: 20px;
}

.wlcome--login {

}

.wlcome--password {

}


</style>