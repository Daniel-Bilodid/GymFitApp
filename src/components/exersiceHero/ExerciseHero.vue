<template>
  <div class="hero">
    <div class="hero__wrapper">
      <div class="hero__text">
        <div class="hero__text-title">Fitness Helper</div>

        <div class="hero__text-subtitle">Sweat, Smile And Repeat</div>

        <div class="hero__text-ad">
          Check out the most effective exercises personalized to you
        </div>

        <div>
          <button class="hero__text-btn">Explore Exercises</button>
        </div>
      </div>

      <div class="hero__wrapper-img">
        <img src="../../assets/banner.png" alt="banner" />
      </div>
    </div>
  </div>
</template>

<script>
import "./exerciseHero.scss";

export default {
  name: "ExerciseHero",
};
</script>
