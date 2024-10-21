import { createRouter, createWebHistory } from "vue-router";
import ExerciseInfo from "../components/exerciseInfo/ExerciseInfo.vue";
import Exercises from "../components/exercises/Exercises.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
