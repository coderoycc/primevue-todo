<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <i class="pi pi-exclamation-triangle !text-6xl text-red-500"></i>
    <h1 class="mt-4 text-2xl font-bold text-gray-800">
      404 - Página No Encontrada
    </h1>
    <p class="mt-2 text-gray-600">
      Lo sentimos, la página que buscas no existe.
    </p>
    <router-link
      to="/"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Regresar a Inicio
    </router-link>
  </div>
</template>

<script setup></script>
