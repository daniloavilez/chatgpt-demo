import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  orgId: process.env.OPENAI_ORG_ID,
  openaiApiKey: process.env.OPENAI_API_KEY
};
