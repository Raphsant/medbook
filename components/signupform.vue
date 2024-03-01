<script setup>

const signupForm = ref({
  firstName: "",
  lastName: "",
  id: "",
  email: "",
  username: "",
  password: "",
  role: "User"

})

const isLoading = ref(false);

async function signup() {
  try {
    isLoading.value = true;
    const res = await $fetch("https://postgresapp-e83cc2ceb04b.herokuapp.com/api/auth/signup", {
      method: "POST",
      body: signupForm.value
    })
    await new Promise((r) => setTimeout(r, 1000))
    if (res) {
      isLoading.value = false;
      navigateTo("/")
    }

  } catch (e) {
    console.error(e)
  }
  console.log(signupForm.value)
}
const selected = ref(false)

</script>

<template>
  <template>

    <UCard>
      <template #header>
        <div>
          Bienvenido al Sistema De Citas Del Centro Clinico Vista Centro
        </div>
      </template>
      <UForm class="space-y-4" @submit="signup">
        <UFormGroup label="Nombre de Usuario" name="username">
          <UInput v-model="signupForm.username"/>
        </UFormGroup>
        <UFormGroup label="Cedula de identidad" name="id">
          <UInput v-model="signupForm.id"/>
        </UFormGroup>
        <UFormGroup label="Nombre" name="firstName">
          <UInput v-model="signupForm.firstName"/>
        </UFormGroup>
        <UFormGroup label="Apeliido" name="lastName">
          <UInput v-model="signupForm.lastName"/>
        </UFormGroup>
        <UFormGroup label="Correo Electronico" name="email">
          <UInput v-model="signupForm.email"/>
        </UFormGroup>
        <UFormGroup label="Contraseña" name="password">
          <UInput v-model="signupForm.password" type="password"/>
        </UFormGroup>
        <div class="flex gap-4 justify-start items-center">
          <UButton type="submit">
            Entrar
          </UButton>
          <UCheckbox v-model="selected" name="notifications" label="Acepto los terminos y condiciones" />
        </div>
      </UForm>
    </UCard>


  </template>
</template>

<style scoped>

</style>