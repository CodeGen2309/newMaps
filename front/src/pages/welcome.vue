<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotif } from '@orion.ui/orion';

import userStore from '@/stores/userStore';
import apirator from '@/lib/apirator';


let router = useRouter()
let login = ref()
let password = ref()


async function signIn () {
  let filter = { login: login.value }
  let req    = await apirator.get('users', filter)
  let user   = req[0]

  if ( res.length == 0 ) {
    return useNotif.danger('Нерправильный логин')
  }

  if ( user.password != password.value ) { 
    return useNotif.danger('Нерправильный пароль')
  }

  userStore.setUser(user)
  return router.push({ name: 'maps' })
}


onMounted(async () => {
  let session = await userStore.checkSesion()

  console.log({ currUser: userStore.user });

  if ( !session ) { return false }
  return router.push({ name: 'maps' })
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