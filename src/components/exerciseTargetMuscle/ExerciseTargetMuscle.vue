<template>
  <div class="target">
    <div class="target__title">
      <span>Similar Target Muscle</span>
      {{ targetData[0] ? targetData[0].bodyPart : "" }}
    </div>

    <swiper
      class="target__list"
      :navigation="true"
      :pagination="true"
      :slides-per-view="3"
      :space-between="50"
    >
      <swiper-slide
        v-for="(item, index) in targetData.slice(0, 9)"
        :key="index"
        class="target__list-card"
      >
        <router-link :to="`/exercise/${item.id}`">
          <img v-if="item.gifUrl" :src="item.gifUrl" alt="img" />
          <button class="target__list-bodypart">
            {{ item.target }}
          </button>
          <div class="target__list-name">
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
import { getTarget } from "../../services/exerciseService";
import "./exerciseTargetMuscle.scss";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  name: "ExerciseTargetMuscle",
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
    const targetData = ref([]);
    const route = useRoute();

    const fetchTarget = async (targetType) => {
      if (targetType) {
        try {
          targetData.value = await getTarget(targetType);
          console.log(targetData.value);
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
