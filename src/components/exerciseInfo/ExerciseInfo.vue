<template>
  <div class="info">
    <div class="info__wrapper" v-if="exercise">
      <div class="info__gif">
        <img
          v-if="exercise.gifUrl"
          :src="exercise.gifUrl"
          :alt="exercise.name"
        />
        <p v-else>No GIF available for this exercise.</p>
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
    <ExerciseVideos :exercise="exercise" />
    <ExerciseSimilarEquipment :exercise="exercise" />
    <ExerciseTargetMuscle :exercise="exercise" />
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getExerciseById } from "../../services/exerciseService";
import ExerciseVideos from "../exerciseVideos/ExerciseVideos.vue";
import ExerciseTargetMuscle from "../exerciseTargetMuscle/ExerciseTargetMuscle.vue";
import ExerciseSimilarEquipment from "../exerciseSimilarEquipment/ExerciseSimilarEquipment.vue";
import "./exerciseInfo.scss";

export default {
  name: "ExerciseInfo",
  components: {
    ExerciseVideos,
    ExerciseTargetMuscle,
    ExerciseSimilarEquipment,
  },
  setup() {
    const route = useRoute();
    const exercise = ref(null);

    const fetchExercise = async (exerciseId) => {
      try {
        exercise.value = await getExerciseById(exerciseId);
        console.log("Fetched exercise:", exercise.value);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };

    // Изначальная загрузка упражнения
    onMounted(() => {
      fetchExercise(route.params.id);
    });

    // Наблюдение за изменениями параметра id
    watch(
      () => route.params.id,
      (newId) => {
        if (newId) {
          fetchExercise(newId);
        }
      }
    );

    return {
      exercise,
    };
  },
};
</script>

<style lang="scss"></style>
