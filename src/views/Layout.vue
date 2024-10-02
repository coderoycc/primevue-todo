<template>
  <div class="w-full">
    <Menu />
    <div class="container mx-auto mt-2">
      <router-view></router-view>
    </div>
  </div>
  <Toast />
</template>
<script setup>
import Menu from "@components/layout/Menu.vue";
</script>
