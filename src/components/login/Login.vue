<template>
  <div class="login">
    <div class="login__close" @click.prevent="$emit('close')">X</div>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleRegister">Register</button>
    <button @click="handleLogin">Login</button>
    <button @click="handleGoogleLogin">Login with Google</button>

    <button @click="handleLogout" v-if="currentUser" class="logout">
      Logout
    </button>
  </div>
</template>

<script>
import "./login.scss";
import { ref, watch } from "vue";
import { register, login, loginWithGoogle, logout } from "../../firebase"; // Импортируем logout

export default {
  name: "Login",
  props: {
    currentUser: Object, // Пропс для текущего пользователя
  },
  setup(props) {
    const email = ref("");
    const password = ref("");

    // Локальная переменная для отслеживания currentUser
    const currentUserRef = ref(props.currentUser);

    // Следим за изменениями в props.currentUser
    watch(
      () => props.currentUser,
      (newUser) => {
        currentUserRef.value = newUser;
      }
    );

    const handleRegister = async () => {
      await register(email.value, password.value);
    };

    const handleLogin = async () => {
      await login(email.value, password.value);
    };

    const handleGoogleLogin = async () => {
      await loginWithGoogle();
    };

    const handleLogout = async () => {
      console.log("Logging out...");
      await logout();
      currentUserRef.value = null; // Обнуляем локальное состояние после выхода
    };

    return {
      email,
      password,
      currentUserRef, // Возвращаем currentUserRef для использования в шаблоне
      handleRegister,
      handleLogin,
      handleGoogleLogin,
      handleLogout,
    };
  },
};
</script>
