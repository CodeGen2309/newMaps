<script setup>

import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apirator from '@/lib/apirator';


let router     = useRouter()
let params     = useRoute().params
let mapID      = JSON.parse(params.id)

let mapFile    = reactive([])
let mapFileUploaded = ref(true)
let groupsList = ref([])

let map = ref({
  name: 'Новая карта', groups: [],
  imgPath: '',
})


async function getMap () {
  let res = await apirator.get('maps', { id: mapID })  

  map.value = res[0]
  map.value.groups = JSON.parse(res[0].groups)
}


function printImage () {
  mapFileUploaded.value = false
  console.log(mapFile[0]);
}


async function saveMap () {
  let fileData, mapData, res

  if (!mapFileUploaded.value) {
    console.log('PULOAD MAP IMAEG');
    
    fileData = await apirator.uploadFile(mapFile[0])
    console.log({ fileData });
    
    map.value.imgPath = fileData.path
    mapFileUploaded.value = true
  }

  mapData = {
    name: map.value.name,
    groups: JSON.stringify(map.value.groups),
    imgPath: map.value.imgPath
  }

  if (mapID) { res = await apirator.update('maps', mapData, { id: mapID }) }
  else { res = await apirator.insert('maps', mapData) }

  return  router.push({ name: 'userView' })
}


async function deleteMap () {
  await apirator.delete('maps', { id: mapID })  
  return  router.push({ name: 'maplist' })
}


onMounted(async () => {
  if (mapID) { getMap(map.value.imgPath) }

  groupsList.value = await apirator.get('groups')
})


</script>


<template>
<section class="mapCard">
  <h3 class="mapCard--headTitle" :key="map.name">{{  map.name  }}</h3>

  <div class="mapCard--params">
    <label class="mapCard--label">
      <h4 class="mapCard--labelTitle">Название карты</h4>
      <OInput class="mapCard--labelInput" label="Название" v-model="map.name" />
    </label>

    <label class="mapCard--label">
      <h4 class="mapCard--labelTitle">Файл карты</h4>
      <OUpload v-model="mapFile" 
        :file-types="['image/png', 'image/jpeg']"
        @change="printImage"
      />
    </label>

    <div class="mapCard--groups">
      <h4 class="mapCard--groupsTitle">Группы</h4>
      <OCheckbox v-for="item in groupsList" :key="item.id" 
        v-model="map.groups" :input-value="item.id"
        class="mapCard--groupsItem" :label="item.name" 
        multiple="true"
      />
    </div>

    <div class="mapCard--spacer"></div>

    <div class="mapCard--buttons">
      <OButton color="success" prefix-icon="save" @click="saveMap" >
        Сохранить
      </OButton>

      <OButton v-show="mapID" color="danger" 
        prefix-icon="trash_full"
        @click="deleteMap"
      >
        Удалить
      </OButton>
    </div>
  </div>
</section>
</template>


<style scoped>

.mapCard {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mapCard--headTitle {
  padding: 20px;
  border-bottom: 1px solid var(--grey-dark);
}

.mapCard--params {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  gap: 40px;
}

.mapCard--label {

}

.mapCard--headTitle {

}

.mapCard--groups {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.mapCard--groupsTitle {
  width: 100%;
  margin: 0; padding: 0;
}

.mapCard--groupsItem {
  font-size: 1rem;
  background: rgba(0, 0, 0, .1);
  padding: 10px 20px;
  border-radius: 10px;
}

.mapCard--spacer {
  flex-grow: 1;
}

.mapCard--buttons {
  display: flex;
  gap: 20px;
}


</style>