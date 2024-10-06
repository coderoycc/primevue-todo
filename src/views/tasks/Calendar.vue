<template>
  <TaskCalendar />
</template>
<script setup>
import { onMounted } from "vue";
import TaskCalendar from "@components/tasks/TaskCalendar.vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.dispatch("fetchTasks");
});
</script>
