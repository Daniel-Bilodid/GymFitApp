<template>
  <div>
    <exerciseSearch />
    <exercisesParts @update:bodyPart="onBodyPart" />
    <h1>Exercise for {{ bodyPart }}</h1>
    <ul class="exercises__list">
      <li
        class="exercises__list-card"
        v-for="exercise in exercises"
        :key="exercise.id"
      >
        <router-link
          class="exercises__list-link"
          :to="`/exercise/${exercise.id}`"
        >
          <img :src="exercise.gifUrl" :alt="exercise.name" />
          <p class="exercises__list-bodypart">{{ exercise.bodyPart }}</p>
          <p class="exercises__list-name">{{ exercise.name }}</p>
          <!-- <p class="exercises__instructions">{{ exercise.instructions }}</p> -->
        </router-link>
      </li>
    </ul>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span>Страница {{ currentPage }}</span>
      <button @click="nextPage" :disabled="exercises.length < limit">
        Вперед
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import {
  getExercisesByBodyPart,
  getAllExercises,
} from "../../services/exerciseService";
import ExercisesParts from "../exercisesParts/ExercisesParts.vue";
import ExerciseSearch from "../exersiceSearch/ExerciseSearch.vue";
import "./exercise.scss";

export default {
  components: {
    ExercisesParts,
    ExerciseSearch,
  },
  setup() {
    const bodyPart = ref("chest");
    const exercises = ref([]);
    const currentPage = ref(1);
    const limit = ref(20);

    const fetchExercises = async () => {
      const offset = (currentPage.value - 1) * limit.value;
      if (bodyPart.value !== "all") {
        exercises.value = await getExercisesByBodyPart(
          bodyPart.value,
          offset,
          limit.value
        );
      } else {
        exercises.value = await getAllExercises(offset, limit.value);
      }
    };

    onMounted(fetchExercises);

    watch([bodyPart, currentPage], fetchExercises);

    const onBodyPart = (selectedBodyPart) => {
      bodyPart.value = selectedBodyPart;
      currentPage.value = 1;
    };

    const nextPage = () => {
      currentPage.value++;
    };

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    return {
      bodyPart,
      exercises,
      currentPage,
      limit,
      nextPage,
      prevPage,
      onBodyPart,
    };
  },
};
</script>
