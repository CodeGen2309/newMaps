<script setup>
  import { onMounted } from 'vue';
  import maps from '../../public/mocks/maps.js';
  import pinMap from '../../public/icons/pinMap.svg?component';


  onMounted(() => {
    console.log(maps);
  })
</script>


<template>
  <section class="maps">
    <div class="maps--block maps--menu">
      <ul class="maps--menuList">
        <li class="maps--menuItem"
          v-for="item in maps"
        >
          <pinMap class="maps--pinIcon" />
          {{ item.title }}
        </li>
      </ul>
    </div>

    <div class="maps--block maps--content">
      <RouterView></RouterView>
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


.maps--menu {}

.maps--menuList {
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 250px;
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
  background: violet;
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