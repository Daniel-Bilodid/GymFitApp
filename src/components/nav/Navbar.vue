<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <div class="navbar__wrapper">
        <img src="../../assets/weight.png" alt="logo" />
        <div class="navbar__name">GymFit</div>
        {{ console.log(currentUser) }}
      </div>
    </div>
    <ul class="navbar__list">
      <li>
        <a href="/">Home</a>
      </li>
      <li v-if="!currentUser">
        <a href="/profile" @click.prevent="$emit('open-login')"
          >Login/Register</a
        >
      </li>

      <li v-else>
        <a href="#" @click="handleLogout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from "vue";
import { logout } from "../../firebase"; // Импортируем функцию логаута
import "./nav.scss";
export default {
  name: "Navbar",
  props: {
    currentUser: Object,
  },
  setup(props) {
    const handleLogout = async () => {
      console.log("Logging out...");
      await logout();
      // После успешного выхода, вызываем событие logout, чтобы родительский компонент обновил currentUser
      props.$emit("logout");
    };

    return {
      handleLogout,
    };
  },
};
</script>
