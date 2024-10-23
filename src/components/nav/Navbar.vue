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
        <a href="#">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import "./nav.scss";
export default {
  name: "Navbar",
  props: {
    currentUser: Object,
  },
  setup(props) {},
};
</script>
