<template>
  <div class="target">
    <div v-if="exercise" class="target__title">
      <span>Similar Equipment</span>
      {{ exercise.equipment }}
    </div>
    <span v-else>Loading...</span>

    <ul class="target__list">
      <li
        v-for="(item, index) in equipmentData"
        :key="index"
        class="target__list-item"
      >
        <img :src="item[index].gifUrl" alt="img" />
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getEquipment } from "../../services/exerciseService";

export default {
  name: "ExerciseTargetMuscle",

  props: {
    exercise: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const equipmentType = ref(props.exercise?.equipment || null);
    const equipmentData = ref([]);

    const fetchEquipment = async () => {
      if (equipmentType.value) {
        try {
          equipmentData.value = await getEquipment(equipmentType.value);
        } catch (error) {
          console.error("Error fetching equipment:", error);
        }
      } else {
        console.warn("Equipment type is not defined.");
      }
    };

    onMounted(fetchEquipment);

    return {
      equipmentData,
      exercise: props.exercise,
    };
  },
};
</script>
