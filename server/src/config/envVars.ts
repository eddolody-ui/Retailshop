// import "dotenv/config";

export const ENV_VARS = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || "https://retailshop-k8s1.onrender.com",
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  ACEESS_JWT_SECRET: process.env.ACEESS_JWT_SECRET,
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
};
