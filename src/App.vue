<template>
  <div id="app">
    <Navbar @open-login="openLoginModal" :currentUser="currentUser" />
    <Login
      v-if="isLoginModalOpen"
      @close="closeLoginModal"
      :currentUser="currentUser"
    />

    <div class="app__hello">
      <p v-if="currentUser">Welcome, {{ currentUser.displayName }}</p>

      <p v-else>Please log in</p>
    </div>
    <ExerciseHero />
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Navbar from "./components/nav/Navbar.vue";
import Login from "./components/login/Login.vue";
import Exercises from "./components/exercises/Exercises.vue";
import ExerciseHero from "./components/exersiceHero/ExerciseHero.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./app.scss";

export default {
  name: "App",
  components: {
    Navbar,
    Login,
    Exercises,
    ExerciseHero,
  },
  setup() {
    const isLoginModalOpen = ref(false);
    const currentUser = ref(null);

    const openLoginModal = () => {
      isLoginModalOpen.value = true;
    };

    const closeLoginModal = () => {
      isLoginModalOpen.value = false;
    };

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          currentUser.value = user;
          console.log("User is logged in:", user);
        } else {
          currentUser.value = null;
          console.log("No user is logged in");
        }
      });
    });

    return {
      isLoginModalOpen,
      currentUser,
      openLoginModal,
      closeLoginModal,
    };
  },
};
</script>

<style></style>
