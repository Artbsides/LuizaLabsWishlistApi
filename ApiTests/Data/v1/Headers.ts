require("dotenv").config();

export const headers: Record<string, any> = {
  ApiKey: process.env.API_KEYS?.split(",")[Math.round(Math.random())] as string,
  ApiVersion: "1"
};
