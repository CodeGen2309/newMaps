<script setup>
import { inject } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

inject('$cookies')

</script>

<template>
<router-view class="mainRouter" v-slot="{ Component }">
  <transition name="fadeAnim">
    <component :is="Component" />
  </transition>
</router-view></template>

<style scoped>

.fadeAnim-enter-active, 
.fadeAnim-leave-active {
  opacity: 0;
}

</style>
