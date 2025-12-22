<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apirator from '@/lib/apirator';

let router = useRouter()
let params = useRoute().params
let userID = params.id

let groupsList = ref([])
let user = ref({
  name: 'Новый пользователь', login: 'newUser',
  password: 'newPassword', isAdmin: 0,
  groups: []
})


//TODO ну ты понял =)
async function getUser ( id ) {
  let req     = await apirator.get('users', { id })
  let user    = req[0]

  user.groups = JSON.parse(user.groups)

  // TODO переписать этот кусок в отдельную функцию навеное
  groupsList.value.forEach( item => {
    item.active = user.groups.includes(item.id)
  })

  return user
}


async function getGroups () {
  let req = await apirator.get('groups')

  return req.map(item => {
    return { id: item.id, name: item.name, active: false }
  })
}


async function saveUser  () {
  user.value.groups = JSON.stringify(user.value.groups)

  if (user.value.isAdmin) { user.value.isAdmin = 1 }
  else { user.value.isAdmin = 0 }

  if   (userID == 'false') { apirator.insert('users', user.value) }
  else { apirator.update('users', user.value, { id: userID }) }

  return router.push({ name: 'users' })
}


async function deleteUser  () {
  apirator.delete('users', { id: userID })
  return router.push({ name: 'users' })
}


onMounted( async () => {
  groupsList.value = await getGroups()

  if ( userID != 'false' ) { user.value = await getUser(userID) }
})
</script>


<template>
  <section class="user">
    <div class="user--header">
      <h3 class="user--headTitle" :key="user.name">{{  user.name  }}</h3>
    </div>

    <div class="user--params">
      <OInput label="Имя" v-model="user.name" />
      <OInput label="Логин" v-model="user.login" />
      <OInput label="Пароль" v-model="user.password" />
    </div>

    <div class="user--groups">
      <OCheckbox v-for="item in groupsList" :key="item.id" 
        v-model="user.groups" :input-value="item.id"
        class="user--groupsItem" :label="item.name" 
        multiple="true"
      />

      <OCheckbox class="user--groupsItem user--groupsItem-admin" 
        v-model="user.isAdmin" label="режим Боженьки"
      />
    </div>

    <div class="user--buttons">
      <OButton color="success" prefix-icon="save" @click="saveUser">
        Сохранить
      </OButton>

      <OButton v-if="userID != 'false'" color="danger" prefix-icon="trash_full" @click="deleteUser">
        Удалить
      </OButton>
    </div>
  </section>
</template>


<style scoped>

.user {
  display: flex;
  flex-direction: column;
  width: 100%; min-height: 100%;
}

.user--header {
  display: flex;
  justify-content: space-between;
  margin: 20px; padding: 10px;

  border-bottom: 1px solid rgba(0, 0, 0, .2);
  box-sizing: border-box;
}

.user--headTitle {
  margin: 0; padding: 0;
}

.user--params {
  padding: 20px;
}

.user--groups {
  display: flex;
  flex-wrap: wrap;

  padding: 20px;
}

.user--groupsItem {  
  font-size: 1rem;
  margin: 6px;
  background: rgba(0, 0, 0, .1);
  padding: 10px 20px;
  border-radius: 10px;
}

.user--buttons {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;

  padding: 20px;
}

.user--groupsItem-admin {
  background: #16a085;
  font-weight: 600;
}

</style>