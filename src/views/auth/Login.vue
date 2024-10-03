<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Mis Tareas 📑 | Login
      </h2>
      <form @submit.prevent="sendForm">
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
        <Button type="submit" label="Ingresar" class="w-full p-button p-button-primary" />
      </form>
      <p class="text-end mt-2">
        ¿No tienes una cuenta?
        <router-link class="font-semibold" to="/register"
          >Regístrate</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { login } from "@services/authService";
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const store = useStore();
const router = useRouter();
const toast = useToast();
const email = ref("");
const password = ref("");

const sendForm = async () => {
  try {
    if(email.value.length > 0 && password.value.length > 0){
    const { data } = await login({ email: email.value, password: password.value });
      if(data.success){
        toast.add({ summary: 'Login correcto', detail: 'Redireccionando', severity: 'success', life: 2000 });
        store.commit('setTokenSession', data.token);
        store.commit('setUserSession', data.user);
        router.push('/');
      }else{
        toast.add({ severity: 'error', summary: 'Login Incorrecto', detail: 'Crendenciales incorrectos', life: 2500 });
      }
    }else{
      toast.add({ severity: 'error', summary: 'Formulario incorrecto', detail: 'Todos los campos son requeridos', life: 2300 });
    }    
  } catch (error) {
    console.log(error)
    const resMessage = error.response.data.message ?? 'Error desconocido, inténtelo más tarde';
    store.commit('clearTokenSession');
    toast.add({ severity: 'error', summary: 'Error Login', detail: resMessage, life: 2400 });
  }
};
</script>
