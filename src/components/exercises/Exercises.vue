<template>
  <div>
    <h1>Упражнения для {{ bodyPart }}</h1>
    <ul>
      <li v-for="exercise in exercises" :key="exercise.id">
        <img :src="exercise.gifUrl" :alt="exercise.name" />
        <p>{{ exercise.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getExercisesByBodyPart } from "../../services/exerciseService";

export default {
  setup() {
    const bodyPart = ref("chest"); // Пример: грудь
    const exercises = ref([]);

    onMounted(async () => {
      exercises.value = await getExercisesByBodyPart(bodyPart.value);
    });

    return {
      bodyPart,
      exercises,
    };
  },
};
</script>

<style scoped>
img {
  width: 150px;
  height: auto;
}
</style>
