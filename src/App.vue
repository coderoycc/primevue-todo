<template>
  <router-view />
  <Toast />
</template>
<script setup>
import { useStore } from "vuex";
import { mockup } from "./config/mockupData";
const store = useStore();
store.dispatch("getDataSession");
mockup();
</script>

<style scope>
* {
  scrollbar-width: thin;
}
input.p-datepicker-input {
  cursor: pointer;
}
</style>
