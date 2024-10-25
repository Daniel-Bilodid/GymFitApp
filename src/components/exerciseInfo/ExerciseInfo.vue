<template>
  <div class="info">
    <div class="info__wrapper" v-if="exercise">
      <div class="info__gif">
        <img :src="exercise.gifUrl" :alt="exercise.name" />
      </div>

      <div class="info__text">
        <div class="info__text-name">{{ exercise.name }}</div>
        <div
          class="info__text-instructions"
          v-for="(item, index) in exercise.instructions"
          :key="index"
        >
          {{ `${index + 1}.  ${item}` }}
        </div>

        <div class="info__groups">
          <div class="info__text-group">
            <div class="info__text-icon">
              <i class="fas fa-user"></i>
            </div>
            <span>{{ exercise.bodyPart }}</span>
          </div>
          <div class="info__text-group">
            <div class="info__text-icon">
              <i class="fas fa-dumbbell"></i>
            </div>
            <span>{{ exercise.equipment }}</span>
          </div>
          <div class="info__text-group">
            <div class="info__text-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <span>{{ exercise.target }}</span>
          </div>
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
