<template>
  <div class="w-full mt-1 pb-2" v-if="formState.send && formState.error">
    <Message severity="error" closable @close="formState.send = false">{{
      formState.error
    }}</Message>
  </div>
  <form @submit.prevent="sendForm">
    <div class="w-full">
      <div class="mt-5">
        <FloatLabel>
          <InputText type="password" v-model="passForm.password" class="w-full" />
          <label for="titulo"
            >Contraseña actual <span class="text-red-500">*</span></label
          >
        </FloatLabel>
      </div>
      <div class="mt-6">
        <FloatLabel>
          <InputText type="password" v-model="passForm.newPassword" class="w-full" />
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
        <Button
          type="submit"
          severity="success"
          label="Cambiar"
          :disabled="formState.send"
        />
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref, watch } from "vue";
import { changePass } from "@services/authService";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const formState = ref({
  send: false,
  error: "",
});
const emit = defineEmits(["send"]);
const passForm = ref({
  password: "",
  repeatNew: "",
  newPassword: "",
});
watch(
  passForm.value,
  (newx) => {
    if (formState.value.send) {
      formState.value.send = false;
      validateForm();
    }
  },
  { deep: true }
);
function validateForm() {
  if (passForm.value.newPassword.length == 0 || passForm.value.password.length == 0) {
    formState.value.error = "Todos los campos son obligatorios";
    return;
  }
  if (passForm.value.newPassword.length < 8) {
    formState.value.error = "La nueva contraseña debe tener 8 caracteres como mínimo";
    return;
  }
  if (passForm.value.newPassword !== passForm.value.repeatNew) {
    formState.value.error = "Las contraseñas nuevas no coinciden";
    return;
  }
  formState.value.error = "";
  return;
}
async function sendForm() {
  console.log(passForm.value);
  formState.value.send = true;
  validateForm();
  if (!formState.value.error) {
    // const res = await ;
    console.log("enviar todo correcto");
    changePass(passForm.value)
      .then((response) => {
        toast.add({ severity: "success", life: 2300, summary: "Contraseña cambiada" });
        formState.value.send = false;
        emit("send");
      })
      .catch((error) => {
        formState.value.error = error.response.data.message;
      });
  }
}
</script>
