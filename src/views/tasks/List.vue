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
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import TaskList from "@components/tasks/TaskList.vue";
import TaskForm from "@components/tasks/TaskForm.vue";
const drawerNewTask = ref(false);
const store = useStore();
const testsData = computed(() => store.state.test);
onMounted(() => {
  store.dispatch("fetchTasks", { name: "rest", other: "Data" });
});
</script>
