<template>
  <div class="login">
    <div class="login__close" @click.prevent="$emit('close')">X</div>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleRegister">Register</button>
    <button @click="handleLogin">Login</button>
    <button @click="handleGoogleLogin">Login with Google</button>
  </div>
</template>

<script>
import "./login.scss";
import { ref } from "vue";
import { register, login, loginWithGoogle } from "../../firebase"; // Путь к firebase.js

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");

    const handleRegister = async () => {
      await register(email.value, password.value);
    };

    const handleLogin = async () => {
      await login(email.value, password.value);
    };

    const handleGoogleLogin = async () => {
      await loginWithGoogle();
    };

    return {
      email,
      password,
      handleRegister,
      handleLogin,
      handleGoogleLogin,
    };
  },
};
</script>
