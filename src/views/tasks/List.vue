<template>
  <div class="w-full flex justify-center">
    <TaskList />
  </div>
  <div class="fixed bottom-4 right-4 z-10">
    <Button
      severity="info"
      rounded
      raised
      icon="pi pi-fw pi-plus"
      v-tooltip="'Agregar nueva tarea'"
      @click="drawerNewTask = true"
    />
  </div>

  <Drawer v-model:visible="drawerNewTask" header="Nueva tarea" position="right">
    <TaskForm @saved="drawerNewTask = false" :newTask="true" />
  </Drawer>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import TaskList from "@components/tasks/TaskList.vue";
import TaskForm from "@components/tasks/TaskForm.vue";
const drawerNewTask = ref(false);
const store = useStore();
onMounted(() => {
  store.dispatch("fetchTasks");
});
</script>
