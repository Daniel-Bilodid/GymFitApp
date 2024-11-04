<template>
  <div class="target">
    {{ targetData }}
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getTarget } from "../../services/exerciseService";
import "./exerciseSimilarEquipment.scss";

export default {
  name: "ExerciseSimilarEquipment",

  props: {
    exercise: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const targetData = ref([]);
    const route = useRoute();

    const fetchTarget = async (targetType) => {
      if (targetType) {
        try {
          targetData.value = await getTarget(targetType);
          console.log(targetData);
        } catch (error) {
          console.error("Error fetching target data:", error);
        }
      }
    };

    watch(
      () => props.exercise,
      (newExercise) => {
        if (newExercise && newExercise.target) {
          fetchTarget(newExercise.target);
        } else {
          console.warn("Target type is not defined.");
        }
      },
      { immediate: true }
    );

    watch(
      () => route.params.id,
      async (newId) => {
        if (props.exercise && props.exercise.target) {
          await fetchTarget(props.exercise.target);
        }
      }
    );

    return {
      targetData,
      exercise: props.exercise,
    };
  },
};
</script>
