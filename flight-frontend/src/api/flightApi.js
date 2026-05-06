import API from "./axios";

export const getAllFlights = () => API.get("/flight");