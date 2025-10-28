<script setup>
</script>


<template>
  <section class="defView">
    <div class="defView--block defView--menu"></div>

    <div class="defView--block defView--content">
      <RouterView></RouterView>
    </div>
    
    <div class="defView--block defView--info"></div>
  </section>
</template>


<style scoped>
.defView {
  display: flex;
  gap: 20px;

  background: white;
  width: 100vw; height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  transition: .3s;
}


.defView--block {
  border-radius: 20px;
  transition: .3s;
}


.defView--block-inactive {
  display: none;
}


.defView--menu {
  background: yellowgreen;
  width: 300px;
}


.defView--content {
  flex-grow: 1;
  background: violet;
}


.defView--info {
  background: rebeccapurple;
  /* width: 300px; */
  width: 300px;
}

</style>