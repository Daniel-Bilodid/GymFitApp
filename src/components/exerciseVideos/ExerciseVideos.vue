<template>
  <div class="video">
    <div v-if="exercise" class="video__title">
      <span>Similar Target Muscle</span>
      exercise video
    </div>
    <span v-else>Loading...</span>

    <ul class="video__list">
      <li
        class="video__list-item"
        v-for="(video, index) in videos"
        :key="index"
      >
        <a
          className="exercise-video"
          :href="
            `https://www.youtube.com/watch?v=${videos[index].id.videoId}`
              ? `https://www.youtube.com/watch?v=${videos[index].id.videoId}`
              : `https://www.youtube.com/shorts/${videos[index].id.videoId}`
          "
        >
          <img
            :src="
              videos[index] ? videos[index].snippet.thumbnails.high.url : ''
            "
            alt=""
          />

          <p>
            {{
              videos[index]
                ? videos[index].snippet.title.length > 25
                  ? videos[index].snippet.title.slice(0, 37) + "..."
                  : videos[index].snippet.title.length
                : ""
            }}
          </p>
          <p>{{ videos[index] ? videos[index].snippet.channelTitle : "" }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { searchVideos } from "../../services/youtubeService";
import "./exerciseVideos.scss";
export default {
  name: "ExerciseVideos",

  props: {
    exercise: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const videos = ref([]);

    const fetchVideos = async () => {
      if (props.exercise && props.exercise.name) {
        try {
          videos.value = await searchVideos(props.exercise.name);
        } catch (error) {
          console.error(error);
        }
      }
    };

    watch(
      () => props.exercise,
      (newValue) => {
        if (newValue) {
          fetchVideos();
        }
      },
      { immediate: true }
    );

    return {
      videos,
    };
  },
};
</script>
