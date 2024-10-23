<template>
  <div class="info">
    <div class="info__wrapper" v-if="exercise">
      <div class="info__gif">
        <img :src="exercise.gifUrl" :alt="exercise.name" />
      </div>

      <div class="info__text">
        <div class="info__text-name">Exercise name: {{ exercise.name }}</div>
        <div class="info__text-bodyPart">BodyPart: {{ exercise.bodyPart }}</div>
        <div class="info__text-equipment">
          Equipment: {{ exercise.equipment }}
        </div>

        <div class="info__text-targer">Target: {{ exercise.target }}</div>

        <div class="info__text-instructions">
          Instructions: {{ exercise.instructions }}
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getExerciseById } from "../../services/exerciseService";
import "./exerciseInfo.scss";
export default {
  name: "ExerciseInfo",
  setup() {
    const route = useRoute();
    const exerciseId = route.params.id;
    const exercise = ref(null);
    const fetchExercise = async () => {
      try {
        exercise.value = await getExerciseById(exerciseId);
        console.log(exercise.value);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };

    onMounted(fetchExercise);
    return {
      exercise,
    };
  },
};
</script>

<style lang="scss"></style>
