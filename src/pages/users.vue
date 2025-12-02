<script setup>

let users = [
  { id: 1, name: 'Иванов И.И' },
  { id: 2, name: 'Гендальф Белый' },
  { id: 3, name: 'Обиван Кеноби' },
  { id: 4, name: 'Зелимхан Чеченец' },
]

</script>


<template>
  <section class="defusers">
    <div class="defusers--header">
      <h3 class="defusers--headTitle">Юзеры</h3>
      <div class="defusers--headPanel">
        <o-button prefix-icon="add_plus" color="info" />
        <o-button prefix-icon="trash_empty" color="danger" />
      </div>
    </div>

    <div class="defusers--list">
      <div class="defusers--listItem" v-for="user in users"
      >
        <div class="defusers--listName">
          <o-avatar :name="user.name" size="xs" color="success"  />
          <p class="defusers--listName"> {{  user.name  }} </p>
        </div>

        <div class="defusers--listPanel">
          <o-checkbox color="info" />
          <o-button prefix-icon="edit_pencil_01" color="info" 
            @click="$router.push({ name: 'usercard', params: { name: user.name } })"
          />
          <o-button prefix-icon="trash_empty" color="danger" />
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