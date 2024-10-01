<template>
  <div class="w-full flex justify-center">
    <TaskList />
  </div>
  <div class="absolute bottom-3 right-3">
    <Button
      severity="info"
      rounded
      icon="pi pi-fw pi-plus"
      v-tooltip="'Agregar nueva tarea'"
      @click="drawerNewTask = true"
    />
  </div>

  <Drawer v-model:visible="drawerNewTask" header="Nueva tarea" position="right">
    <TaskForm :newTask="true" />
  </Drawer>
</template>
<script setup>
import { ref } from "vue";
import TaskList from "@components/tasks/TaskList.vue";
import Button from "primevue/button";
import Drawer from "primevue/drawer";
import TaskForm from "@components/tasks/TaskForm.vue";
const drawerNewTask = ref(false);
</script>
