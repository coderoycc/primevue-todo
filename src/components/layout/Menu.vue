<template>
  <div class="card">
    <MegaMenu :model="items" class="p-4 bg-surface-0">
      <template #start>
        <img src="@assets/logo.svg" width="35" style="margin: 0 0.5rem" />
        <span class="text-2xl font-semibold mx-0">Mis Tareas</span>
      </template>
      <template #item="{ item }">
        <a
          v-if="item.root"
          v-ripple
          class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg"
          style="border-radius: 2rem"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <!-- <template #end>
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
        />
      </template> -->
    </MegaMenu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";
import MegaMenu from "primevue/megamenu";
import Button from "primevue/button";

const items = ref([
  {
    label: "Lista",
    root: true,
  },
  {
    label: "Calendario",
    root: true,
  },
]);
</script>
