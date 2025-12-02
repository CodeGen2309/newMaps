<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

let params = useRoute().params
let userName = ref('')

let userGroups = [
  { id: 1, name: 'Безопасники' },
  { id: 2, name: 'Админы' },
  { id: 3, name: 'Охрана' },
  { id: 4, name: 'Хер пойми зачем тут нужны' },
  { id: 5, name: 'Петушня залетная' },
  { id: 5, name: 'Те которым просто кнопочки потыкать' },
]



onMounted(() => {
  userName.value = params.name
})
</script>


<template>
  <section class="user">
    <div class="user--header">
      <h3 class="user--headTitle">{{  userName  }}</h3>
    </div>

    <div class="user--params">
      <OInput label="Имя" v-model="userName" />
      <OInput label="Логин" />
      <OInput label="Пароль" />
    </div>

     <div class="user--groups">
      <OCheckbox v-for="item in userGroups"
        class="user--groupsItem" 
        :label="item.name" 
      />
     </div>

     <div class="user--buttons">
      <OButton color="success" prefix-icon="save" @click="$router.go(-1)">
        Сохранить
      </OButton>

      <OButton color="danger" prefix-icon="trash_full" @click="$router.go(-1)">
        Удалить
      </OButton>
     </div>
  </section>
</template>


<style scoped>

.user {
  display: flex;
  flex-direction: column;
  width: 100%; min-height: 100%;
}

.user--header {
  display: flex;
  justify-content: space-between;
  margin: 20px; padding: 10px;

  border-bottom: 1px solid rgba(0, 0, 0, .2);
  box-sizing: border-box;
}

.user--headTitle {
  margin: 0; padding: 0;
}

.user--params {
  padding: 20px;
}

.user--groups {
  display: flex;
  flex-wrap: wrap;

  padding: 20px;
}

.user--groupsItem {  
  font-size: 1rem;
  margin: 6px;
  background: rgba(0, 0, 0, .1);
  padding: 10px 20px;
  border-radius: 10px;
}

.user--buttons {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;

  

  padding: 20px;
}

</style>