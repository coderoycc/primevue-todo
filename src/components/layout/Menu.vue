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
    <div class="flex flex-col gap-4 w-[15rem]">
      <div class="border-b-2">
        <span class="font-semibold block mb-2"
          ><i class="pi pi-fw pi-bell"></i> Notificaciones</span
        >
      </div>
      <div class="flex justify-between">
        <div class="text-muted-color">Tareas pendientes</div>
        <Badge :value="pendientes" severity="info"></Badge>
      </div>
      <div class="flex justify-between pb-2 border-b-2">
        <div class="text-muted-color">Tareas que vencen hoy</div>
        <Badge :value="expiresToday" severity="warn"></Badge>
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
const op = ref();
const store = useStore();
const toast = useToast();
const router = useRouter();
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
</script>
<style scoped>
.custom-shadow {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>
