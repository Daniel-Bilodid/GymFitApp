<template>
  <div class="login">
    <div class="login__close" @click.prevent="$emit('close')">X</div>
  </div>
</template>

<script>
import "./login.scss";

export default {
  name: "Login",
};
</script>
