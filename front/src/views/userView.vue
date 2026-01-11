<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import userStore from '@/stores/userStore.js';
import apirator from '@/lib/apirator.js';

let router = useRouter()
let route = useRoute()
let user = userStore.user
let maplist = ref([])


function logOut () {
  userStore.logOut()
  router.push({ name: 'welcome' })
}


function checkAccess (groups) {
  if (user.isAdmin) { return true }

  for (let group of user.groups) {
    if (groups.includes(group)) { return true }
  }

  return false
}


onMounted(async () => {
  let res = await apirator.get('maps')

  maplist.value = res.map(item => {
    return {
      id: item.id, name: item.name, 
      groups: JSON.parse(item.groups)
    }
  })
})
</script>


<template>
  <section class="maps">
    <div class="maps--block maps--menu">
      <div class="maps--menuList">
        <o-button block="true" v-for="item in maplist"
          color="brand" prefix-icon="map_pin"
          v-show="checkAccess(item.groups)"
          @click="$router.push({ name: 'maps', params: { id: item.id } })"
        >
          {{ item.name }}
        </o-button>
      </div>

      <div class="maps--menuFooter">
        <OButton color="info" v-if="user.isAdmin"
          @click="$router.push({ name: 'users' })"
          prefix-icon="settings_future" block="true" 
        >
          Админка
        </OButton>

        <OButton color="danger" @click="logOut"
          prefix-icon="exit" block="true" 
        >
          Выход
        </OButton>
      </div>
    </div>

    <div class="maps--block maps--content">
      <RouterView :key="route.fullPath" />
    </div>
  </section>
</template>


<style scoped>

.maps {
  display: flex;
  gap: 20px;

  width: 100vw; height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  transition: .3s;
}


.maps--block {
  border-radius: 20px;
  transition: .3s;
}


.maps--block-inactive {
  display: none;
}


.maps--menu {
  display: flex;
  flex-direction: column;

  min-width: 320px;
  max-width: 320px;
}


.maps--menuList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  flex-grow: 1;

  width: 100%;
  text-align: center;

  margin: 0; padding: 0;
  list-style-type: none;
  transition: .3s;
}

.maps--menuItem {
  box-sizing: border-box;
  padding: 15px;

  cursor: pointer;
  transition: .3s;
}

.maps--menuFooter {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.maps--content {
  flex-grow: 1;
  background: thistle;
  overflow: hidden;
}

.maps--content::-webkit-scrollbar {
  display: none;
}

.maps--contentImg {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
  /* transform: scale(4); */
}


.maps--info {
  background: rebeccapurple;
  /* width: 300px; */
  width: 300px;
}

.maps--pinIcon {
  fill: salmon;
  width: 30px; height: 30px;
}

</style>