<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <div class="navbar__wrapper">
        <img src="../../assets/weight.png" alt="logo" />
        <div class="navbar__name">GymFit</div>
      </div>
    </div>
    <ul class="navbar__list">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/profile">Profile</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import "./nav.scss";
export default {
  name: "Navbar",
};
</script>
