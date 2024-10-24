<template>
  <div class="search">
    <div class="search__title">Awesome Exercises You Should Know</div>

    <div class="search__wrapper">
      <input type="text" class="search__input" placeholder="Search Exercise" />
      <button class="search__btn">Search</button>
    </div>
  </div>
</template>

<script>
import "./exerciseSearch.scss";

export default {
  name: "ExerciseSearch",
};
</script>
