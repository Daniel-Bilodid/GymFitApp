<template>
  <div>
    <span v-if="exercise">{{ exercise.bodyPart }}</span>
    <span v-else>Loading...</span>

    exercise videos
    {{ videos[0] ? videos[0].id.videoId : "" }}

    {{ videos[0] ? videos[0].snippet.thumbnails.default.url : "" }}
    {{ videos[0] }}

    <ul class="video__list">
      <li v-for="(video, index) in videos" :key="index">
        <img
          :src="videos[index] ? videos[index].snippet.thumbnails.high.url : ''"
          alt=""
        />

        <p>{{ videos[index] ? videos[index].snippet.title : "" }}</p>
        <p>{{ videos[index] ? videos[index].snippet.channelTitle : "" }}</p>
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
