<template>
  <div class="equipment">
    <div class="equipment__title">
      <span>Similar Equipment</span>
      {{ exercise ? exercise.equipment : "" }}
    </div>

    <swiper
      class="equipment__list"
      :navigation="true"
      :pagination="true"
      :slides-per-view="3"
      :space-between="50"
    >
      <swiper-slide
        v-for="(item, index) in equipmentData.slice(0, 9)"
        :key="index"
        class="equipment__list-card"
      >
        <router-link :to="`/exercise/${item.id}`">
          <img v-if="item.gifUrl" :src="item.gifUrl" alt="img" />
          <button class="equipment__list-bodypart">
            {{ item.target }}
          </button>
          <div class="equipment__list-name">
            {{
              item.name.length > 25 ? item.name.slice(0, 32) + "..." : item.name
            }}
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getEquipment } from "../../services/exerciseService";
import { Swiper, SwiperSlide } from "swiper/vue";
import "./exerciseSimilarEquipment.scss";
export default {
  name: "ExerciseSimilarEquipment",
  components: {
    Swiper,
    SwiperSlide,
  },
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
