<script setup>

let pages = [
  { 
    title: 'Юзеры', 
    pageName: 'users', 
    icon: 'user_01', 
    disabled: false 
  },
  { 
    title: 'Роли и права', 
    pageName: 'groups', 
    icon: 'users_group', 
    disabled: false 
  },
  { 
    title: 'Список карт', 
    pageName: 'maplist', 
    icon: 'map', 
    disabled: false 
  },
  { 
    title: 'Логи', 
    pageName: '', 
    icon: 'window_terminal', 
    disabled: true 
  },
]

</script>


<template>
  <section class="defView">
    <div class="defView--block defView--menu">
      <div class="defView--menuNav">
        <o-button v-for="item in pages"
          color="brand"
          outline="true"
          block="true"
          class="defView--menuItem"
          :prefix-icon="item.icon"
          :disabled="item.disabled"
          @click="$router.push({ name: item.pageName })"
        >
          {{ item.title }}
        </o-button>
      </div>

      <div class="defView--menuFooter">
        <OButton color="info" @click="$router.push({ name: 'userView' })"
          prefix-icon="map_pin" block="true"
        >
          Карты
        </OButton>
      </div>
    </div>

    <div class="defView--block defView--content">
      <router-view v-slot="{ Component }">
        <transition name="subAnim">
          <component class="subRouter" :is="Component" />
        </transition>
      </router-view>
    </div>    
  </section>
</template>


<style scoped>
.defView {
  display: flex;
  gap: 20px;

  width: 100vw; height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  transition: .3s;
}


.defView--block {
  border-radius: 20px;
  transition: .3s;
}


.defView--menu {
  display: flex;
  flex-direction: column;

  min-width: 320px;
  max-width: 320px;
}

.defView--menuItem {
  margin: 10px 0px;
}


.defView--menuNav {
  flex-grow: 1;
}


.defView--content {
  flex-grow: 1;
  background: rgba(0, 0, 0, .05);
  overflow: hidden;
  overflow-y: scroll;
  transition: .3s;
}

.subRouter {
  transition: .4s;
}

.subAnim-enter-active, 
.subAnim-leave-active {
  opacity: 0;
}

</style>