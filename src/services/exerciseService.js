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

const cacheData = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

const getCachedData = (key, maxAge = 3 * 24 * 60 * 60 * 1000) => {
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
    const response = await instance.get(`/exercises/bodyPart/${bodyPart}`, {
      params: {
        offset,
        limit,
        _: Date.now(),
      },
    });
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
    const response = await instance.get(`/exercises`, {
      params: {
        offset,
        limit,
        _: Date.now(),
      },
    });
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
    const response = await instance.get("/exercises/bodyPartList", {
      params: {
        _: Date.now(),
      },
    });
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
    console.log(`Getting exercise with ID "${id}" from cache.`, cachedData);

    if (cachedData.gifUrl) {
      return cachedData;
    } else {
      console.warn(`GIF URL not found for exercise ID "${id}".`);
    }
  }

  console.log(`Fetching exercise with ID "${id}" from API.`);
  try {
    const response = await instance.get(`/exercises/exercise/${id}`, {
      params: {
        _: Date.now(),
      },
    });
    if (response.data && response.data.gifUrl) {
      cacheData(cacheKey, response.data);
      return response.data;
    } else {
      console.error("Invalid response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    return [];
  }
};

export const getEquipment = async (type) => {
  const cacheKey = `equipment:${type}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    console.log(`Getting equipment type "${type}" from cache.`);
    return cachedData;
  }

  console.log(`Fetching equipment type "${type}" from API.`);
  try {
    const response = await instance.get(`/exercises/equipment/${type}`, {
      params: {
        _: Date.now(),
      },
    });
    cacheData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment type:", error);
    return [];
  }
};

export const getTarget = async (target) => {
  const cacheKey = `target:${target}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    console.log(`Getting target muscle "${target}" from cache.`);
    return cachedData;
  }

  console.log(`Fetching target muscle "${target}" from API.`);
  try {
    const response = await instance.get(`/exercises/target/${target}`, {
      params: {
        _: Date.now(),
      },
    });
    cacheData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching target muscle:", error);
    return [];
  }
};
