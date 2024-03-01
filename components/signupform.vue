<script setup>
const {isMobile} = useDevice();
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
  <div v-if="!isMobile">
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



  </div>
  <div v-if="isMobile">
    <UCard>
      <template #header>
        <div class="w-full flex flex-col gap-1 justify-center items-center">
          <div class="text-lg text-gray-500 text-center">
            Bienvenido al sistema Medbook de
          </div>
          <div class="text-primary text-center">
            Centro Clinico Vista Centro
          </div>
        </div>
      </template>
      <UForm class="space-y-4" @submit="signup">
        <UFormGroup label="Nombre de Usuario">
          <UInput size="xl" v-model="signupForm.username"  icon="i-heroicons-at-symbol" />
        </UFormGroup>
        <UFormGroup label="Primer Nombre">
          <UInput size="xl" v-model="signupForm.firstName" icon="i-heroicons-user"/>
        </UFormGroup>
        <UFormGroup label="Apellido">
          <UInput size="xl" v-model="signupForm.lastName" icon="i-heroicons-user"/>
        </UFormGroup>
        <UFormGroup label="Cedula de Identidad">
          <UInput size="xl" v-model="signupForm.id" icon="i-heroicons-identification"/>
        </UFormGroup>
        <UFormGroup label="Correo Electronico">
          <UInput size="xl" v-model="signupForm.email" icon="i-heroicons-envelope"/>
        </UFormGroup>
        <UFormGroup label="Contraseña">
          <UInput type="password" size="xl" v-model="signupForm.password" icon="i-heroicons-key"/>
        </UFormGroup>
        <UButton type="submit" block>Registrarse</UButton>
      </UForm>
      <template #footer>
        <div class="flex flex-col justify-center items-center gap-4">
          <div class="text-sm text-center">
            Al ingresar estas aceptando nuestros <span class="text-primary">terminos y condidiciones</span>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style scoped>

</style>