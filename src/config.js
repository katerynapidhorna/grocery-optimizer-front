export const ENV = process.env.NODE_ENV || "development";

export const BACKEND_URL =
  ENV === "production"
    ? "https://grocery-optimizer-back.herokuapp.com"
    : "http://localhost:4000";
