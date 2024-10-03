<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Mis Tareas 📑 | Registro
      </h2>
      <form @submit.prevent="sendForm">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 mb-2">Nombre </label>
          <InputText
            v-model="formRegister.name"
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
            v-model="formRegister.email"
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
            v-model="formRegister.password"
            id="password"
            type="password"
            class="w-full p-inputtext-sm p-component"
            placeholder="*************"
          />
        </div>
        <Button type="submit" label="Registrarse" class="w-full p-button p-button-primary" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { register } from "@services/authService";
import { useStore } from "vuex"
import { useRouter } from "vue-router"
const formRegister = ref({
  email: '',
  password: '',
  name: ''
});
const router = useRouter();
const store = useStore();
const toast = useToast();
const sendForm = async () => {
  console.log('asdafsdf')
  try {
    console.log('dento')
    if(validateForm()){
      const { data } = await register(formRegister.value);
      if(data.success){
        toast.add({ summary: 'Registro exitoso', detail: 'Login automático', severity: 'success', life: 2300 });
        store.commit('setTokenSession', data.token);
        store.commit('setUserSession', data.user);
        router.push('/');
      }else{
        toast.add({ severity: 'warn', summary: 'Ocurrio un error', detail: 'Inténtelo mas tarde', life: 2500 });
      }
    }
  } catch (error) {
    const resMessage = error.response.data.message ?? 'Error desconocido, inténtelo más tarde';
    store.commit('clearTokenSession');
    console.log(error)
    toast.add({ severity: 'error', summary: 'Error registro', detail: resMessage, life: 2400 })
  }
};
const validateForm = () => {
  if(!(formRegister.value.email.length > 0 && formRegister.value.name.length > 0 && formRegister.value.password.length > 4)){
    toast.add({ severity: 'error', summary: 'Error fomulario', detail: 'Todos los campos som obligatorios', life: 2700 });
    return false;
  }
  return true;
}
</script>
