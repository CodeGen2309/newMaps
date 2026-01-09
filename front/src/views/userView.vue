<script setup>
import { onMounted, ref } from 'vue';
import maps from '../../public/mocks/maps.js';
import userMap from '@/components/map.vue'
import userStore from '@/stores/userStore.js';

import apirator from '@/lib/apirator.js';

let user = userStore.user
let currMaps = ref([])

onMounted(async () => {
  let res = await apirator.get('maps')

  currMaps.value = res.map(item => {
    return {
      id: item.id, name: item.name, 
      groups: JSON.parse(item.groups)
    }
  })

  console.log({ res });
})
</script>


<template>
  <section class="maps">
    <div class="maps--block maps--menu">
      <ul class="maps--menuList">
        <RouterLink v-for="item, id in maps" to="/maps">
          <o-button block="true"
            color="brand" prefix-icon="map_pin"
          >
            {{ item.title }}
          </o-button>
        </RouterLink>

        <h4 v-for="item in currMaps">{{ item }}</h4>
      </ul>

      <div class="maps--menuFooter">
        <OButton color="info" v-if="user.isAdmin"
          @click="$router.push({ name: 'users' })"
          prefix-icon="settings_future" block="true" 
        >
          Админка
        </OButton>
      </div>
    </div>

    <div class="maps--block maps--content">
      <userMap></userMap>
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