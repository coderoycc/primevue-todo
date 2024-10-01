<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Mis Tareas 📑 | Registro
      </h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 mb-2">Nombre </label>
          <InputText
            v-model="name"
            id="name"
            type="name"
            class="w-full p-inputtext-sm p-component"
            placeholder="Nombre completo"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-2"
            >Correo electrónico</label
          >
          <InputText
            v-model="email"
            id="email"
            type="email"
            class="w-full p-inputtext-sm p-component"
            placeholder="mail@mail.com"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 mb-2"
            >Contraseña</label
          >
          <InputText
            v-model="password"
            id="password"
            type="password"
            class="w-full p-inputtext-sm p-component"
            placeholder="*************"
          />
        </div>
        <Button label="Registrarse" class="w-full p-button p-button-primary" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const email = ref("");
const password = ref("");
const name = ref("");

const login = async () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  // Aquí puedes manejar la lógica de autenticación
};
</script>
