<template>
  <div class="card">
    <MegaMenu :model="items" class="p-4 bg-surface-0">
      <template #start>
        <img src="@assets/logo.svg" width="35" style="margin: 0 0.5rem" />
        <span class="text-2xl font-semibold mx-0">Mis Tareas</span>
      </template>
      <template #item="{ item }">
        <router-link
          :to="item.to"
          v-if="item.root"
          v-ripple
          class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg"
          style="border-radius: 2rem"
        >
          <!-- <span :class="item.icon" /> -->
          <span class="ml-2">{{ item.label }}</span>
        </router-link>
      </template>
      <template #end>
        <div class="cursor-pointer w-full" @click.prevent="showDialog($event)" ref="refAvatar">
          <Avatar
            image="/user.png"
            shape="circle"
          />
        </div>
      </template>
    </MegaMenu>
  </div>

</template>

<script setup>
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useRouter } from "vue-router";
const refAvatar = ref();
const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const items = ref([
  {
    label: "Lista",
    to: "/",
    root: true,
  },
  {
    label: "Calendario",
    to: "/calendar",
    root: true,
  },
]);
function showDialog(event){
  confirm.require({
    target: refAvatar.value,
    defaultFocus: true,  
    message: "¿Desea cerrar sesión?",
    icon: "pi pi-exclamation-triangle",
    position:"top",
    rejectProps: {
      label: "No",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Sí",
    },
    accept: () => {
      store.commit('clearTokenSession');
      toast.add({ severity: 'info', life: 2300, summary: 'Cerrando sesión'});
      router.push('/login');
    },
  });
}
</script>
