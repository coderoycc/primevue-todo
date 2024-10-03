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
    <div v-if="newTask || !task.expires" class="mt-2">
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
          <DatePicker v-model="taskForm.expires" class="w-full" dateFormat="yy-mm-dd" />
        </template>
      </Inplace>
    </div>
    <!-- En caso de editar -->
    <div v-if="task.expires" class="mt-2">
      <label for="tags" class="block text-gray-700 mb-2"
        >Fecha de vencimiento</label
      >
      <DatePicker
        v-model="taskForm.expires"
        class="w-full"
        dateFormat="yy-mm-dd"
      />
    </div>
    <div class="mt-3">
      <div class="mb-4">
        <label for="tags" class="block text-gray-700 mb-2"
          >Etiquetas
          <span class="float-end mr-2">{{ tagsLength }}/4 </span></label
        >
        <Chips
          v-model="taskForm.tags"
          class="w-full p-component"
          :max="4"
          placeholder="Presiona Enter para agregar "
        />
      </div>
    </div>

    <div class="flex flex-row justify-end mt-7">
      <Button
        severity="success"
        :label="newTask ? 'Guardar' : 'Actualizar'"
        icon="pi pi-save"
        @click="sendForm"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { create, update } from "../../services/taskService";
const toast = useToast();
const store = useStore();
const emit = defineEmits(['saved'])
const tagsLength = computed(() =>
  taskForm.value.tags ? taskForm.value.tags.length : 0
);
const taskDefault = {
  title: "",
  description: "",
  tags: [],
  expires: null,
};
const props = defineProps({
  newTask: {
    type: Boolean,
    required: true,
  },
  task: {
    type: Object,
    required: false,
    default: {},
  },
});

const taskForm = ref({});
onMounted(() => {
  console.log(store.state.test);
  if (!props.newTask) {
    taskForm.value = { ...props.task };
  } else taskForm.value = { ...taskDefault };
});
async function sendForm() {
  console.log(taskForm.value);
  if (validateForm()) {
    try {
      let response = {};
      if(props.newTask)
        response = await create(taskForm.value);
      else
        response = await update(taskForm.value);

      console.log(response)
      if(response.data.success){
        toast.add({ severity: 'success', summary: props.newTask ? 'Creado':'Actualizado', life: 2400})
        emit('saved', []);
        store.commit('refreshTasks', response.data.data ?? []);
      }
    } catch (error) {
      console.log(error);
      const res = error.response;
      const message = res.data ? res.data.message : 'Error desconocido';
      toast.add({ severity: 'error', summary: 'Error', detail: message, life: 2400})
    }
  }
}
function validateForm() {
  const title = taskForm.value.title.trim();
  const description = taskForm.value.description.trim();
  const tagsLength = taskForm.value.tags.length;
  if (title.length >= 0 && description.length >= 0 && tagsLength <= 4) {
    if (title.length < 3) {
      toast.add({
        severity: "error",
        summary: "Formulario inválido",
        detail: "Titulo muy corto",
        life: 2500,
      });
      return false;
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Formulario inválido",
      detail: "Complete los campos requeridos",
      life: 2500,
    });
    return false;
  }
  return true;
}
</script>
