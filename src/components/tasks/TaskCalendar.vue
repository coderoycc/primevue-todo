<template>
  <Calendar expanded :columns="2" :attributes="attributes" />
</template>
<script setup>
import "v-calendar/style.css";
import { computed } from "vue";
import { Calendar } from "v-calendar";
import { useStore } from "vuex";
const store = useStore();
const todos = computed(() => {
  const data = store.getters.dataTaskFilter("pendiente");
  return data.filter((x) => x.expires);
});
const attributes = computed(() => [
  {
    key: "today",
    highlight: "yellow",
    dates: new Date(),
    popover: {
      label: "Hoy",
      visibility: "click",
    },
    hideIndicator: false,
  },
  // Attributes for todos
  ...todos.value.map((todo) => ({
    highlight: true,
    dates: todo.expires,
    dot: {
      color: "red",
    },
    popover: {
      label: todo.title,
    },
  })),
]);
</script>
<style scoped></style>
