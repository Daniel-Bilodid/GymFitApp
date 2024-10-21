<template>
  <div class="info">
    <div class="info__wrapper">
      <div class="info__gif">
        <img :src="exercise.value.gifUrl" :alt="exercise.value.name" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getExerciseById } from "../../services/exerciseService";
export default {
  name: "ExerciseInfo",
  setup() {
    const route = useRoute();
    const exerciseId = route.params.id;
    const exercise = ref(null);
    const fetchExercise = async () => {
      exercise.value = await getExerciseById(exerciseId);
      console.log(exercise.value.bodyPart);
    };

    onMounted(fetchExercise);
    return {
      exerciseId,
    };
  },
};
</script>

<style lang="scss"></style>
