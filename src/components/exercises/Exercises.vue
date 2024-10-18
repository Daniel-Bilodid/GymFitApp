<template>
  <div>
    <exercisesParts @update:bodyPart="onBodyPart" />
    <h1>Упражнения для {{ bodyPart }}</h1>
    <ul class="exercises__list">
      <li v-for="exercise in exercises" :key="exercise.id">
        <img :src="exercise.gifUrl" :alt="exercise.name" />
        <p class="exercises__list-name">{{ exercise.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getExercisesByBodyPart } from "../../services/exerciseService";
import ExercisesParts from "../exercisesParts/ExercisesParts.vue";

export default {
  components: {
    ExercisesParts,
  },
  setup() {
    const bodyPart = ref("chest");
    const exercises = ref([]);

    const fetchExercises = async () => {
      exercises.value = await getExercisesByBodyPart(bodyPart.value);
    };

    onMounted(fetchExercises);

    watch(bodyPart, fetchExercises);

    const onBodyPart = (selectedBodyPart) => {
      bodyPart.value = selectedBodyPart;
    };

    return {
      bodyPart,
      exercises,
      onBodyPart,
    };
  },
};
</script>

<style lang="scss">
img {
  width: 350px;
  height: auto;
}

.exercises__list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  &-name {
    width: 70px;
  }
}
</style>
