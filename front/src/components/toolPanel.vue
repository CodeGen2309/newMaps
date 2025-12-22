<script setup>
import { ref, defineProps } from 'vue';

let props = defineProps(['camera'])

</script>

<template>
  <div class="tools" :class="{ 'tools-inactive': !isActive }">
    <label class="tools--label">
      <p class="tools--title">Поворот</p>

      <input type="range" min = "0" max="360"
        v-model="camera.cameraAngle"
        @input="$emit('rotateEvent', camera.cameraAngle )" 
      />
    </label>

    <label class="tools--label">
      <p class="tools--title">Угол обзора (ширина) </p>

      <input type="range" min = "5" max="60"
        v-model="camera.viewAngle"
        @input="$emit('viewAngle', camera.viewAngle )" 
      />
    </label>

    <label class="tools--label">
      <p class="tools--title">Дальность</p>

      <input type="range" min = "100" max="600"
        v-model="camera.radius"
        @input="$emit('radiusEvent', camera.radius)" 
      />
    </label>
  </div>
</template>


<style>
  .tools {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;

    opacity: 1;
    transition: .3s;
  }

  .tools--label {
  }

  .tools--title {
    margin: 0; padding: 4px 0px;
    font-size: 1rem;
  }
  
</style>