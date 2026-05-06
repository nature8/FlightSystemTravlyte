import API from "./axios";

export const getAllPassengers = () => API.get("/passenger");