<script setup>
import { onMounted, ref } from 'vue';
import apirator from '@/lib/apirator';


let maps = ref([])


onMounted(async () => {
  let res = await apirator.get('maps')
  maps.value = res
})
</script>


<template>
  <section class="maplist">
    <div class="maplist--header flex--row-sbc">
      <h3 class="maplist--headTitle">Карты</h3>
      <o-button prefix-icon="add_plus" color="info"
        @click="$router.push({ name: 'mapcard', params: { id: false } })" 
      />
    </div>

    <div class="maplist--list flex--col-csb">
      <div class="maplist--listItem flex--row-sbc" 
        v-for="item in maps"
      >
        <p class="maplist--mapname">{{ item.name }}</p>

        <div class="maplist--listPanel">
          <o-button prefix-icon="edit_pencil_01" color="info"
            @click="$router.push({ name: 'mapcard', params: { id: item.id } })"
          />

          <o-button prefix-icon="save" :color="item.modified ? 'success' : 'info'" 
            :disabled="!item.modified" @click="false" v-show="false"
          />
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.maplist {}

.maplist--header {
  padding: 20px 0px;
  margin: 0px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--grey-dark);
}

.maplist--headTitle {
  margin: 0; padding: 0;
}

.maplist--list {
  padding: 20px;
  gap: 30px;
}

.maplist--listItem {
  gap: 40px;
  transition: .3s;
}

.maplist--listPanel {
  display: flex;
  gap: 10px
}

.maplist--mapname {
  flex-grow: 1;
}

</style>