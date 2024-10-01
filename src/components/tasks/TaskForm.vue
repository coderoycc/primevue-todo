<template>
  <div class="w-full">
    <div class="mt-6">
      <FloatLabel>
        <InputText id="titulo" v-model="taskForm.title" class="w-full" />
        <label for="titulo">Título <span class="text-red-500">*</span></label>
      </FloatLabel>
    </div>
    <div class="mt-7">
      <FloatLabel>
        <InputText
          id="description"
          v-model="taskForm.description"
          class="w-full"
        />
        <label for="description"
          >Descripción <span class="text-red-500">*</span></label
        >
      </FloatLabel>
    </div>
    <div class="mt-2">
      <Inplace>
        <template #display>
          <label for="tags" class="block text-gray-700 mb-2"
            >¿Agregar fecha de vencimiento?</label
          ></template
        >
        <template #content>
          <label for="tags" class="block text-gray-700 mb-2"
            >Fecha de vencimiento</label
          >
          <DatePicker v-model="taskForm.expires" class="w-full" />
        </template>
      </Inplace>
    </div>
    <div class="mt-3">
      <div class="mb-4">
        <label for="tags" class="block text-gray-700 mb-2">Etiquetas</label>
        <Chips
          v-model="taskForm.tags"
          @keydown.enter.prevent="addTag"
          class="w-full p-component"
          separator=" "
          placeholder="Presiona Enter para agregar "
        />
      </div>
    </div>

    <div class="flex flex-row justify-end mt-7">
      <Button
        severity="success"
        :label="newTask ? 'Guardar' : 'Actualizar'"
        icon="pi pi-save"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Chips from "primevue/chips";
import DatePicker from "primevue/datepicker";
import Inplace from "primevue/inplace";
const props = defineProps({
  newTask: {
    type: Boolean,
    required: true,
  },
});
const taskForm = ref({
  title: "",
  description: "",
  tags: [],
  expires: null,
});

const addTag = () => {
  console.log("nuevas etiquetas");
  // Agrega la etiqueta solo si no está vacía
  if (tags.value.length && tags.value[tags.value.length - 1].trim() !== "") {
    // Permite agregar nuevas etiquetas con Enter
  }
};
</script>
