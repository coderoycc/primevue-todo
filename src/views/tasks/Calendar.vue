<template>
  <div class="w-full">
    <div class="text-xl text-gray-700 my-3 mx-2 md:mx-0 font-semibold">
      CALENDARIO DE TAREAS
    </div>
    <TaskCalendar />
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
import { onMounted, ref } from "vue";
import TaskCalendar from "@components/tasks/TaskCalendar.vue";
import { useStore } from "vuex";
const drawerNewTask = ref(false);
const store = useStore();
onMounted(() => {
  store.dispatch("fetchTasks");
});
</script>
