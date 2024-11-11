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
import { ref } from "vue";
import { getExerciseByName } from "../../services/exerciseService";

export default {
  name: "ExerciseSearch",
  emits: ["update:exerciseData"],
  setup(_, { emit }) {
    const inputExercise = ref("");
    const exerciseData = ref(null);

    const onInputChange = async (value) => {
      console.log(value);
      const result = await getExerciseByName(value);
      exerciseData.value = result;
      emit("update:exerciseData", result);
    };

    return {
      inputExercise,
      exerciseData,
      onInputChange,
    };
  },
};
</script>
