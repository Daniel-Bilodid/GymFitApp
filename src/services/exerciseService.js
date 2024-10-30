// src/services/exerciseService.js
import axios from "axios";

const API_URL = "https://exercisedb.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
});

// Проверка и сохранение в localStorage
const cacheData = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

// Извлечение данных из кеша, если они не устарели
const getCachedData = (key, maxAge = 60 * 60 * 1000) => {
  const cached = JSON.parse(localStorage.getItem(key));
  if (cached && Date.now() - cached.timestamp < maxAge) {
    return cached.data;
  }
  return null;
};

export const getExercisesByBodyPart = async (
  bodyPart,
  offset = 0,
  limit = 20
) => {
  const cacheKey = `exercisesBodyPart:${bodyPart}:${offset}:${limit}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    console.log(`Getting exercises for body part "${bodyPart}" from cache.`);
    return cachedData;
  }

  console.log(`Fetching exercises for body part "${bodyPart}" from API.`);
  try {
    const response = await instance.get(
      `/exercises/bodyPart/${bodyPart}?offset=${offset}&limit=${limit}`
    );
    cacheData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises by body part:", error);
    return [];
  }
};

export const getAllExercises = async (offset = 0, limit = 20) => {
  const cacheKey = `allExercises:${offset}:${limit}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    console.log(`Getting all exercises from cache.`);
    return cachedData;
  }

  console.log(`Fetching all exercises from API.`);
  try {
    const response = await instance.get(
      `/exercises?offset=${offset}&limit=${limit}`
    );
    cacheData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all exercises:", error);
    return [];
  }
};

export const getAllBodypartList = async () => {
  const cacheKey = "bodyPartList";
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    console.log(`Getting body part list from cache.`);
    return cachedData;
  }

  console.log(`Fetching body part list from API.`);
  try {
    const response = await instance.get("/exercises/bodyPartList");
    cacheData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching body part list:", error);
    return [];
  }
};

export const getExerciseById = async (id) => {
  const cacheKey = `exercise:${id}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    console.log(`Getting exercise with ID "${id}" from cache.`);
    return cachedData;
  }

  console.log(`Fetching exercise with ID "${id}" from API.`);
  try {
    const response = await instance.get(`/exercises/exercise/${id}`);
    cacheData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    return [];
  }
};
