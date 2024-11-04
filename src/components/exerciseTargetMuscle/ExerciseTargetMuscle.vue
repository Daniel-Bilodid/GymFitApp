<template>
  <div class="target">
    <div class="target__title">
      <span>Similar Equipment</span>
      {{ exercise ? exercise.equipment : "" }}
    </div>

    <ul class="target__list">
      <li
        v-for="(item, index) in equipmentData.slice(0, 9)"
        :key="index"
        class="target__list-item"
      >
        <router-link :to="`/exercise/${item.id}`">
          <img v-if="item.gifUrl" :src="item.gifUrl" alt="img" />
          <div class="title__name">{{ item.name }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getEquipment } from "../../services/exerciseService";
import "./exerciseTargetMuscle.scss";

export default {
  name: "ExerciseTargetMuscle",

  props: {
    exercise: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const equipmentData = ref([]);
    const route = useRoute();

    const fetchEquipment = async (equipmentType) => {
      if (equipmentType) {
        try {
          equipmentData.value = await getEquipment(equipmentType);
          console.log("Fetched equipment data:", equipmentData.value);
        } catch (error) {
          console.error("Error fetching equipment:", error);
        }
      }
    };

    watch(
      () => props.exercise,
      (newExercise) => {
        if (newExercise && newExercise.equipment) {
          fetchEquipment(newExercise.equipment);
        } else {
          console.warn("Equipment type is not defined.");
        }
      },
      { immediate: true }
    );

    return {
      equipmentData,
      exercise: props.exercise,
    };
  },
};
</script>

<style lang="scss"></style>
