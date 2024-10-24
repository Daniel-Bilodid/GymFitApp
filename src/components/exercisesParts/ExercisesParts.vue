<template>
  <div class="slider-container">
    <swiper :slides-per-view="4" :space-between="50" pagination navigation>
      <swiper-slide
        class="part__list-item"
        v-for="item in list"
        :key="item"
        @click="onBodyPart(item)"
      >
        <img class="part__list-img" src="../../assets/gym.png" alt="somePic" />
        {{ item }}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAllBodypartList } from "../../services/exerciseService";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css"; // Импорт стилей Swiper
import "./exerciseParts.scss";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props, { emit }) {
    const list = ref([]);

    onMounted(async () => {
      const bodyPartList = await getAllBodypartList();
      list.value = ["all", ...bodyPartList, ...bodyPartList]; // Дублируем элементы
    });

    const onBodyPart = (event) => {
      console.log(event);
      const selectedBodyPart = event;
      emit("update:bodyPart", selectedBodyPart);
    };

    return {
      list,
      onBodyPart,
    };
  },
};
</script>

<style lang="scss">
.slider-container {
  width: 80%;
  margin: 0 auto;
}

.swiper {
  height: 300px; /* Установите нужную высоту */
}

.swiper-button-next,
.swiper-button-prev {
  color: black;
  z-index: 20; /* Убедитесь, что стрелки на переднем плане */
  width: 40px; /* Увеличьте ширину стрелок */
  height: 40px; /* Увеличьте высоту стрелок */
}

.part__list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% / 4 - 50px); /* Учтите отступы между слайдами */
}

.part__list-img {
  width: 40px;
  height: 40px;
}
</style>
