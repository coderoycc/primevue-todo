<template>
  <router-view />
  <Toast />
</template>
<script setup>
import { useStore } from 'vuex';
const store = useStore();
store.dispatch('getDataSession');

</script>

<style scope>
* {
  scrollbar-width: thin;
}
</style>
