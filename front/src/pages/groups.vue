<script setup>
import { onMounted, ref } from 'vue';
import userStore from '@/stores/userStore';
import apirator from '@/lib/apirator';

let groups = ref()


function addNewGroupItem () {
  groups.value.push({name: 'Название группы', modified: false})
}


function saveGroup (item) {
  let data = { name: item.name }

  if (item.id) { apirator.update('groups', data, { id: item.id }) }
  else { apirator.insert('groups', data) }
  return item.modified = false
}


function removeGroup (item) {
  apirator.delete('groups', { id: item.id })
  groups.value.delete(item)
}


onMounted( async () => {
  let dbGroups = await apirator.get('groups')

  groups.value = dbGroups.map( item => {
    return { id: item.id, name: item.name, modified: false }
  })

  console.log(groups.value);
})

</script>


<template>
  <section class="defusers">
    <div class="defusers--header">
      <h3 class="defusers--headTitle">Группы пользователей</h3>
      <div class="defusers--headPanel">
        <o-button prefix-icon="add_plus" color="info" @click="addNewGroupItem"  />
      </div>
    </div>

    <div class="defusers--list">
      <div class="defusers--listItem" v-for="item in groups" :key="item.id">
        <o-input v-model="item.name" class="defusers--listName" 
          @focus="item.modified = true"
        />

        <div class="defusers--listPanel">
          <o-button prefix-icon="trash_empty" color="danger"
            @click="removeGroup(item)"
          />

          <o-button prefix-icon="save" 
            :color="item.modified ? 'success' : 'info'" 
            :disabled="!item.modified"  
            @click="saveGroup(item)"
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
  flex-direction: column-reverse;
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