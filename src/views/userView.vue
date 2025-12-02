<script setup>
  import { onMounted } from 'vue';
  import maps from '../../public/mocks/maps.js';
  import userMap from '../components/map.vue'


  onMounted(() => {
    console.log(maps);
  })
</script>


<template>
  <section class="maps">
    <div class="maps--block maps--menu">
      <ul class="maps--menuList">
        <o-button v-for="item in maps"
          block="true"
          color="brand"
          prefix-icon="map_pin"
        >
          {{  item.title }}
        </o-button>
      </ul>

      <div class="maps--menuFooter">
        <OButton color="info" @click="$router.push({ name: 'users' })"
          prefix-icon="settings_future" block="true"
        >
          Админка
        </OButton>
      </div>
    </div>

    <div class="maps--block maps--content">
      <img loading="lazy" class="maps--contentImg" src="/img/map.jpg">
      <!-- <userMap /> -->
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