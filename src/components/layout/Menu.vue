<template>
  <div class="card">
    <MegaMenu :model="items" class="p-4 bg-surface-0">
      <template #start>
        <img src="/logo.svg" width="35" style="margin: 0 0.5rem" />
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
        <div class="flex gap-2 items-center cursor-pointer">
          <Avatar
            image="/user.png"
            shape="circle"
            class="custom-shadow"
            @click="toggle"
          />
        </div>
      </template>
    </MegaMenu>
  </div>

  <Popover ref="op">
    <div class="flex flex-col gap-4 w-[17rem]">
      <div class="flex justify-between items-center border-b-2 pb-2">
        <div>
          <span class="font-semibold block"
            ><i class="pi pi-fw pi-user"></i> {{ userData.name ?? "GUEST" }}</span
          >
        </div>
        <Button
          v-tooltip="'Cambiar contraseña'"
          severity="secondary"
          size="small"
          icon="pi pi-lock"
          raised
          @click="newPass"
        />
      </div>
      <div>
        <span class="font-semibold block mb-1"
          ><i class="pi pi-fw pi-bell"></i> Notificaciones</span
        >
        <div class="flex justify-between mb-1">
          <div class="text-muted-color">Tareas pendientes</div>
          <Badge :value="pendientes" severity="info"></Badge>
        </div>
        <div class="flex justify-between pb-2 border-b-2">
          <div class="text-muted-color">Tareas que vencen hoy</div>
          <Badge :value="expiresToday" severity="warn"></Badge>
        </div>
      </div>
      <div class="flex justify-end m-0 p-0">
        <Button
          label="Cerrar sesión"
          size="small"
          severity="danger"
          text
          raised
          @click="closeSession"
        />
      </div>
    </div>
  </Popover>

  <Dialog
    v-model:visible="dialogNewPass"
    :draggable="false"
    header="Cambiar mi contraseña"
    style="width: 25rem"
  >
    <ChangePassword @send="dialogNewPass = false" />
  </Dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import ChangePassword from "@components/layout/ChangePassword.vue";
const op = ref();
const dialogNewPass = ref(false);
const store = useStore();
const toast = useToast();
const router = useRouter();
const userData = computed(() => store.state.userData);
onMounted(() => {});
const pendientes = computed(() => {
  const data = store.getters.dataTaskFilter("pendiente");
  return data.length;
});
const expiresToday = computed(() => {
  const data = store.getters.dataTaskFilter("today");
  return data.length;
});
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

function toggle(event) {
  op.value.toggle(event);
}
function closeSession() {
  store.commit("clearTokenSession");
  toast.add({
    severity: "info",
    summary: "Sesión cerrada",
    detail: "La sesión ha sido cerrada",
    life: 2300,
  });
  router.push("/login");
}
function newPass() {
  dialogNewPass.value = true;
  toggle();
}
</script>
<style>
.custom-shadow {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
div > div.p-dialog-header {
  padding: 0.7rem 1.25rem !important;
}
</style>
