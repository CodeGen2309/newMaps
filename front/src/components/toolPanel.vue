<script setup>
import { ref } from 'vue';

let rotateAngle = ref(0)
let viewAngle = ref(0)
let radius = ref(0)


</script>

<template>
  <div class="tools" :class="{ 'tools-inactive': !isActive }">
    <label class="tools--label">
      <p class="tools--title">Поворот</p>

      <input type="range" min = "0" max="360"
        v-model="rotateAngle"
        @input="$emit('rotateEvent', rotateAngle )" 
      />
    </label>

    <label class="tools--label">
      <p class="tools--title">Угол обзора (ширина) </p>

      <input type="range" min = "5" max="60"
        v-model="viewAngle"
        @input="$emit('viewAngle', viewAngle )" 
      />
    </label>

    <label class="tools--label">
      <p class="tools--title">Дальность</p>

      <input type="range" min = "100" max="600"
        v-model="radius"
        @input="$emit('radiusEvent', radius)" 
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
    color: black;
    font-size: 1rem;
  }
  
</style>