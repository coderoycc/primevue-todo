<template>
  <form @submit.prevent="sendForm">
    <div class="w-full">
      <div class="mt-6">
        <FloatLabel>
          <InputText type="password" v-model="passForm.password" class="w-full" />
          <label for="titulo"
            >Contraseña actual <span class="text-red-500">*</span></label
          >
        </FloatLabel>
      </div>
      <div class="mt-6">
        <FloatLabel>
          <InputText type="password" v-model="passForm.newPass" class="w-full" />
          <label for="titulo">Nueva contraseña <span class="text-red-500">*</span></label>
        </FloatLabel>
      </div>
      <div class="mt-7">
        <FloatLabel>
          <InputText type="password" v-model="passForm.repeatNew" class="w-full" />
          <label for="description"
            >Repetir nueva contraseña <span class="text-red-500">*</span></label
          >
        </FloatLabel>
      </div>
      <div class="flex justify-end mt-4">
        <Button type="submit" severity="success" label="Cambiar" />
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";
const passForm = ref({
  password: "",
  repeatNew: "",
  newPassword: "",
});
async function sendForm() {}
</script>
