import { createRouter, createWebHistory } from "vue-router";
import ExerciseInfo from "../components/exerciseInfo/ExerciseInfo.vue";
import Exercises from "../components/exercises/Exercises.vue";
import ExerciseSearchResult from "../components/exerciseSearchResult/ExerciseSearchResult.vue";

const routes = [
  {
    path: "/",
    name: "Exercises",
    component: Exercises,
  },
  {
    path: "/exercise/:id",
    name: "ExerciseInfo",
    component: ExerciseInfo,
  },

  {
    path: "/exercise/:name",
    name: "ExerciseSearchResult",
    component: ExerciseSearchResult,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
