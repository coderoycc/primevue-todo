<template>
  <div class="w-full">
    <div class="text-xl text-gray-700 my-3 font-semibold">CALENDARIO DE TAREAS</div>
    <TaskCalendar />
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
    <TaskForm @saved="drawerNewTask = false" :newTask="true" />
  </Drawer>
</template>
<script setup>
import { onMounted, ref } from "vue";
import TaskCalendar from "@components/tasks/TaskCalendar.vue";
import { useStore } from "vuex";
const drawerNewTask = ref(false);
const store = useStore();
onMounted(() => {
  store.dispatch("fetchTasks");
});
</script>
