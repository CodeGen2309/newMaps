<script setup>
import { ref } from 'vue';

  let rotateAngle = ref(0)
  let viewAngle = ref(0)
  let radius = ref(0)

</script>

<template>
  <div class="tools">
    <input type="range" min = "0" max="360"
      v-model="rotateAngle"
      @input="$emit('rotateEvent', rotateAngle )" 
    />

    <input type="range" min = "5" max="60"
      v-model="viewAngle"
      @input="$emit('viewAngle', viewAngle )" 
    />

    <input type="range" min = "100" max="600"
      v-model="radius"
      @input="$emit('radiusEvent', radius)" 
    />
  </div>
</template>


<style>
  .tools {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  
</style>