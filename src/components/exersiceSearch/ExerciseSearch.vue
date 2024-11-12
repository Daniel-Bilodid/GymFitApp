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
      <button class="search__btn" @click="searchExercises">Search</button>
    </div>
  </div>
</template>

<script>
import "./exerciseSearch.scss";
import { ref } from "vue";
import { getExerciseByName } from "../../services/exerciseService";

export default {
  name: "ExerciseSearch",
  emits: ["update:exerciseData", "update:offset"],
  setup(_, { emit }) {
    const inputExercise = ref("");
    const exerciseData = ref(null);
    const offset = ref(0);

    const onInputChange = (value) => {
      inputExercise.value = value;
    };

    const searchExercises = async () => {
      console.log("Поиск с использованием offset:", offset.value);
      const result = await getExerciseByName(inputExercise.value);
      exerciseData.value = result;
      emit("update:exerciseData", result);
      emit("update:offset", offset.value);
    };

    return {
      inputExercise,
      exerciseData,
      onInputChange,
      searchExercises,
    };
  },
};
</script>
