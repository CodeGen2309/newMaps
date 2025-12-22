<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import apirator from '@/lib/apirator';

let router = useRouter()
let users = ref()


function saveUser (user) {
  apirator.update('users', { name: user.name }, { id: user.id })
  user.modified = false
  return true
}


function createNewUser () {
  router.push({ name: 'usercard', params: { id: false } })
}


onMounted(async () => {
  users.value = await apirator.get('users')

  console.log(users.value);
})
</script>


<template>
  <section class="defusers">
    <div class="defusers--header">
      <h3 class="defusers--headTitle">Юзеры</h3>
      <div class="defusers--headPanel">
        <o-button prefix-icon="add_plus" color="info" @click="createNewUser" />
      </div>
    </div>

    <div class="defusers--list">
      <div class="defusers--listItem" v-for="user in users"
      >
        <div class="defusers--listName">
          <o-avatar :name="user.name" size="xs" color="success"  />

          <o-input v-model="user.name" class="defusers--listName" 
            @focus="user.modified = true"
          />
        </div>

        <div class="defusers--listPanel">
          <o-button prefix-icon="edit_pencil_01" color="info" 
            @click="$router.push({ name: 'usercard', params: { id: user.id } })"
          />

          <o-button prefix-icon="trash_empty" color="danger" />

          <o-button prefix-icon="save" :color="user.modified ? 'success' : 'info'" 
            :disabled="!user.modified" @click="saveUser(user)"
          />
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.defusers--header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 10px;

  box-sizing: border-box;
  border-bottom: 1px solid black;
}

.defusers--headTitle {
  margin: 0; padding: 0;
}

.defusers--headPanel {
  display: flex;
  gap: 10px;
}

.defusers--list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
}

.defusers--listItem {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
  font-size: 1rem;

  cursor: pointer;
  transition: .3s;
}

.defusers--listItem:hover {
  background: rgba(0, 0, 0, .2);
}

.defusers--listName {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0; padding: 0;
}

.defusers--listPanel {
  display: flex;
  gap: 10px;
}
</style>