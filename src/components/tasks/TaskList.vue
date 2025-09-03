<template>
  <div class="card w-9/12">
    <DataView :value="tasks" paginator :rows="3">
      <template #header>
        <Select
          v-model="sortKey"
          :options="sortOptions"
          optionLabel="label"
          placeholder="Filtrar"
        />
      </template>
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center py-2 px-6 gap-4"
              :class="{
                'border-t border-surface-200 dark:border-surface-700': index !== 0,
              }"
            >
              <div
                class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-3"
              >
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div>
                    <div class="text-xl font-medium mt-2">
                      <i
                        v-tooltip="item.status"
                        class="pi font-extrabold mr-2"
                        :class="
                          item.status === 'HECHO'
                            ? ['pi-check-circle', 'text-green-800']
                            : ['pi-minus-circle', 'text-surface-500']
                        "
                      ></i
                      >{{ item.title }}
                    </div>
                    <span
                      class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                      >{{ item.description }}
                    </span>
                    <div class="m-0">
                      <i
                        class="pi pi-calendar cursor-pointer"
                        v-tooltip="'Creado el'"
                      ></i>
                      <span class="text-sm text-surface-500 pl-1">
                        Creado: {{ item.created_at.split("T")[0] }}</span
                      >
                    </div>
                    <div class="m-0">
                      <i
                        class="pi pi-calendar cursor-pointer"
                        v-tooltip="'Fecha vencimiento'"
                      ></i>
                      <span class="text-sm text-surface-500 pl-1">
                        Expira: {{ item.expires ?? "S/F" }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-1 md:gap-4">
                  <div class="m-0 flex flex-row md:justify-end flex-wrap gap-1">
                    <template v-for="(tag, index) in item.tags.split(',')" :key="index">
                      <Tag
                        icon="pi pi-tag"
                        :value="tag"
                        severity="secondary"
                        class="!py-0"
                      ></Tag>
                    </template>
                  </div>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button
                      @click="changeStatus($event, item)"
                      icon="pi pi-check"
                      v-if="item.status === 'HECHO'"
                    />
                    <Button
                      v-if="item.status === 'PENDIENTE'"
                      severity="danger"
                      @click="changeStatus($event, item)"
                      icon="pi pi-times"
                    />
                    <Button
                      severity="info"
                      icon="pi pi-pencil"
                      outlined
                      @click="editTask(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <h1 class="text-center">No existen datos para mostrar</h1>
      </template>
    </DataView>
  </div>
  <Drawer v-model:visible="drawerEditTask" header="Actualizar tarea" position="right">
    <TaskForm @saved="drawerEditTask = false" :newTask="false" :task="task" />
  </Drawer>
  <ConfirmPopup />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { changeStatus as changeStatusService } from "@services/taskService";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
const store = useStore();
const toast = useToast();
const drawerEditTask = ref(false);
const confirm = useConfirm();
const task = ref(null);

function changeStatus(event, data) {
  const message =
    data.status === "PENDIENTE"
      ? "¿Marcar tarea como hecha?"
      : "¿Marcar tarea como pendiente?";
  confirm.require({
    target: event.currentTarget,
    message: message,
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: "No",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Sí",
    },
    accept: () => {
      changeStatusTask(data);
    },
  });
}
function changeStatusTask(data) {
  changeStatusService(data)
    .then((response) => {
      if (response.data.success) {
        store.commit("refreshTasks", response.data.data);
        toast.add({
          severity: "success",
          summary: "Actualizado",
          detail: "Tarea actualizada",
          life: 2300,
        });
      }
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Ocurrio un error",
        detail: "Tarea no actualizada",
        life: 2300,
      });
    });
}
const sortKey = ref({ label: "Todos", value: null });
const tasks = computed(() => {
  return store.getters.dataTaskFilter(sortKey.value.value);
});
const sortOptions = ref([
  { label: "Todos", value: null },
  { label: "Tareas que vencen hoy", value: "today" },
  { label: "Tareas pendientes", value: "pendiente" },
  { label: "Tareas terminadas", value: "hecho" },
]);
function editTask(data) {
  const tags = data.tags ? data.tags : "";
  const arrayTags = tags == "" ? [] : tags.split(",");
  task.value = { ...data, tags: arrayTags };
  drawerEditTask.value = true;
}
</script>
