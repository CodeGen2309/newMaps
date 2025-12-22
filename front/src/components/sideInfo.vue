<script setup>
import { onMounted, ref, defineProps } from 'vue'
import apirator from '@/lib/apirator'

let props = defineProps(['camera'])

let groupsList = ref([])
let groups     = ref([])


onMounted( async () => {
  groupsList.value = await apirator.get('groups')
})

</script>


<template>
  <section class="sInfo">
    <label class="sInfo--label">
      <p class="sInfo--title">IP камеры</p>
      <OInput v-model="camera.cameraIP" label="IP камеры"
        class="sInfo--input"
      />
    </label>

    <label class="sInfo--label">
      <p class="sInfo--title">IP регистратора</p>
      <OInput v-model="camera.hostIP" label="IP регистратора" />
    </label>

    <label class="sInfo--label">
      <p class="sInfo--title">Статус</p>
      <OInput v-model="camera.status" label="Статус" disabled="true" />
    </label>

    <div class="sInfo--groups">
      <p class="sInfo--title">Группы пользователей</p>
      <OCheckbox class="sInfo--checkGroup" 
        v-for="group in groupsList" :key="group.id" 
        :label="group.name" v-model="camera.groups" 
        :input-value="group.id"
        multiple="true"
      />
    </div>

    <div class="spacer"></div>

    <OButton color="info" @click="$emit('saveCamera', camera)">Сохранить</OButton>
  </section>
</template>


<style scoped>
.sInfo {
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* background: rgba(255, 255, 255, .8); */
  background: var(--grey-lighter);
  border: 3px solid var(--grey);
  padding: 20px; margin: 10px;
  /* backdrop-filter: blur(10px);   */
}

.sInfo--title {
  width: 100%;
  font-size: 1rem;
}

.sInfo--label {
}

.sInfo--groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sInfo--input {
}

.spacer {
  flex-grow: 1;
}
</style>