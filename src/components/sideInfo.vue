<script setup>
import { ref } from 'vue'

let cameraIP = ref()
let registrIP = ref()
let status = ref('Активна')
let groupsSelect = ref()

let mockGroups = {
  options: [
    'Безопасники',
    'Админы',
    'Охрана',
    'Хер пойми зачем тут нужны',
    'Петушня залетная',
    'Те которым просто кнопочки потыкать',
  ],

  clearable: true
}

</script>


<template>
  <div class="sInfo">
    <label class="sInfo--label">
      <p class="sInfo--title">IP камеры</p>
      <OInput v-model="cameraIP" label="IP камеры" />
    </label>

    <label class="sInfo--label">
      <p class="sInfo--title">IP регистратора</p>
      <OInput v-model="registrIP" label="IP регистратора" />
    </label>

    <label class="sInfo--label">
      <p class="sInfo--title">Статус</p>
      <OInput v-model="status" label="Статус" disabled="true" />
    </label>

    <OSelect multiple="true" v-bind="groupsSelect" :options="mockGroups.options" />
  </div>
</template>


<style scoped>
.sInfo {
  display: flex;
  flex-direction: column;
  gap: 20px;

  background: rgba(255, 255, 255, .8);
  /* background: black; */
  border: 2px solid white;
  padding: 20px; margin: 10px;
  backdrop-filter: blur(10px);  
}

.sInfo--title {
  font-size: 1rem;
}
</style>