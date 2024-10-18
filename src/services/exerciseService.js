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

export const getExercisesByBodyPart = async (bodyPart) => {
  try {
    const response = await instance.get(`/exercises/bodyPart/${bodyPart}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

export const getAllExercises = async () => {
  try {
    const response = await instance.get("/exercises?offset=0&limit=100");
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

export const getAllBodypartList = async () => {
  try {
    const response = await instance.get("/exercises/bodyPartList");
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};
