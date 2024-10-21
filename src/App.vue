<template>
  <div id="app">
    <Navbar @open-login="openLoginModal" />
    <Login v-if="isLoginModalOpen" @close="closeLoginModal" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/nav/Navbar.vue";
import Login from "./components/login/Login.vue";
import Exercises from "./components/exercises/Exercises.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Login,
    Exercises,
  },
  data() {
    return {
      isLoginModalOpen: false,
    };
  },
  methods: {
    openLoginModal() {
      this.isLoginModalOpen = true;
    },
    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
  },
};
</script>
<style></style>
