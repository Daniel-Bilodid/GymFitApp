<template>
  <div>
    <exerciseHero />
    <exerciseSearch @update:exerciseData="handleExerciseData" />
    <exercisesParts @update:bodyPart="onBodyPart" />
    <h1>Exercise for {{ bodyPart }}</h1>

    <div v-if="searchResults && searchResults.length > 0">
      <h2>Результаты поиска:</h2>

      <ul class="exercises__list">
        <li
          class="exercises__list-card"
          v-for="(exercise, index) in searchResults"
          :key="index"
        >
          <router-link
            class="exercises__list-link"
            :to="`/exercise/${exercise.id}`"
          >
            <img :src="exercise.gifUrl" :alt="exercise.name" />
            <button class="exercises__list-bodypart">
              {{ exercise.bodyPart }}
            </button>
            <p class="exercises__list-name">
              {{
                exercise.name.length > 25
                  ? exercise.name.slice(0, 32) + "..."
                  : exercise.name
              }}
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
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
            <button class="exercises__list-bodypart">
              {{ exercise.bodyPart }}
            </button>
            <p class="exercises__list-name">
              {{
                exercise.name.length > 25
                  ? exercise.name.slice(0, 32) + "..."
                  : exercise.name
              }}
            </p>
          </router-link>
        </li>
      </ul>
    </div>

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
import ExerciseHero from "../exersiceHero/ExerciseHero.vue";
import "./exercise.scss";

export default {
  components: {
    ExercisesParts,
    ExerciseSearch,
    ExerciseHero,
  },
  setup() {
    const bodyPart = ref("chest");
    const exercises = ref([]);
    const currentPage = ref(1);
    const limit = ref(20);
    const searchResults = ref(null);

    const handleExerciseData = (data) => {
      searchResults.value = data;
      console.log("Полученные данные из поиска:", searchResults.value);

      searchResults.value.forEach((item) => {
        console.log(item);
      });
    };

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
      handleExerciseData,
      searchResults,
    };
  },
};
</script>
