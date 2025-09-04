<template>
  <div class="mx-3">
    <div class="w-full mb-2">
      <Fieldset legend="Filtros" :toggleable="true">
        <div class="flex justify-center md:justify-between flex-wrap items-center gap-2">
          <div>
            <Select :options="options" optionLabel="name" v-model="filter" />
          </div>
          <div>
            <label class="mr-1 font-medium">Ir a un mes</label>
            <DatePicker
              v-model="date"
              view="month"
              dateFormat="mm/yy"
              placeholder="Selecciona un mes"
              @update:modelValue="changeDate"
              :showButtonBar="true"
            >
            </DatePicker>
          </div>
        </div>
      </Fieldset>
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
const filter = ref({ name: "Pendientes", value: "pendiente", color: "blue" });
const options = [
  { name: "Pendientes", value: "pendiente", color: "blue" },
  { name: "Hechos", value: "hecho", color: "green" },
];
const columns = mapCurrent({ md: 2, lg: 2 }, 1);
const rows = mapCurrent({ md: 1, lg: 1 }, 2);
const store = useStore();
const todos = computed(() => {
  const data = store.getters.dataTaskFilter(filter.value.value);
  const filtered = data.filter((x) => x.expires);
  return filtered;
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
    key: todo.id,
    highlight: filter.value.color,
    dates: new Date(`${todo.expires}`),
    dot: {
      color: "red",
    },
    popover: {
      label: `${todo.title}`,
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
