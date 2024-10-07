<template>
  <div class="mx-3">
    <div class="flex my-4 items-center gap-2">
      <label>Ir a un mes</label>
      <DatePicker
        v-model="date"
        view="month"
        dateFormat="mm/yy"
        placeholder="Selecciona un mes"
        @update:modelValue="changeDate"
        :showButtonBar="true"
      >
        <template #></template>
      </DatePicker>
    </div>
    <Calendar
      ref="cal"
      expanded
      :columns="columns"
      :attributes="attributes"
      :rows="rows"
    />
  </div>
</template>
<script setup>
import "v-calendar/style.css";
import { computed, ref } from "vue";
import { Calendar } from "v-calendar";
import { useStore } from "vuex";
import { useScreens } from "vue-screen-utils";
const { mapCurrent } = useScreens({ xs: "0px", sm: "640px", md: "768px", lg: "1024px" });
const cal = ref();
const date = ref(null);
const columns = mapCurrent({ md: 2, lg: 2 }, 1);
const rows = mapCurrent({ md: 1, lg: 1 }, 2);
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
    dates: new Date(`${todo.expires}T23:59:59.000Z`),
    dot: {
      color: "red",
    },
    popover: {
      label: todo.title,
    },
  })),
]);
function changeDate(event) {
  if (date.value === null) {
    cal.value.move(new Date());
  } else {
    const jumpTo = new Date(date.value);
    cal.value.move(jumpTo);
  }
}
</script>
<style>
input.p-datepicker-input {
  cursor: pointer;
}
</style>
