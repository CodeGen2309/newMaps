<script setup>
import { onMounted, ref, defineProps } from 'vue'
import apirator from '@/lib/apirator'
import { useNotif } from '@orion.ui/orion'

let props = defineProps(['camera'])

let groupsList = ref([])
let groups     = ref([])


async function saveCamera () {
  let position = {
    x: Math.round(props.camera.position.x),
    y: Math.round(props.camera.position.y)
  }

  let mapGroupPosition = {
    x: Math.round(props.camera.mapGroupPosition.x),
    y: Math.round(props.camera.mapGroupPosition.y)
  }
  

  let data = {
    mapID: props.camera.mapID,
    name: null,
    groups: JSON.stringify(props.camera.groups),
    cameraIP: props.camera.cameraIP,
    hostIP: props.camera.hostIP,
    status: props.camera.status,
    position: JSON.stringify(position),
    mapGroupPosition: JSON.stringify(mapGroupPosition),
    cameraAngle: props.camera.cameraAngle,
    viewAngle: props.camera.viewAngle,
    radius: props.camera.radius,
  }

  if (props.camera.id) { await apirator.update('cameras', data, { id: camera.id }) }
  else { await apirator.insert('cameras', data) }

  console.log(data);
  useNotif.success('Камера сохранена')
}


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

    <OButton color="info" 
      click="$emit('saveCamera', camera)"
      @click="saveCamera"
    >
      Сохранить
    </OButton>
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