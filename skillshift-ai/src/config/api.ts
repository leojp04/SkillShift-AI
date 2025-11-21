// Centralized API base URL with fallback to the deployed Render instance.
export const API_BASE =
  import.meta.env.VITE_API_URL ?? "https://api-skillshiftai.onrender.com";
