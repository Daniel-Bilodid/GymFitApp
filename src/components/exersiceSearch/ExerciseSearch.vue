<template>
  <div class="search">
    <div class="search__title">Awesome Exercises You Should Know</div>

    <div class="search__wrapper">
      <input
        type="text"
        class="search__input"
        placeholder="Search Exercise"
        @change="onInputChange($event.target.value)"
      />
      <button class="search__btn">Search</button>
    </div>
  </div>
</template>

<script>
import "./exerciseSearch.scss";

export default {
  name: "ExerciseSearch",
  setup() {
    const inputExercise = ref("");

    return {
      inputExercise,
    };
  },
  methods: {
    onInputChange(value) {
      this.inputExercise.value = value;
    },
  },
};
</script>
