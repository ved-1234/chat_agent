import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;

export const contentstackConfig = {
  apiKey: process.env.CONTENTSTACK_API_KEY!,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT || "development",
  managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN || ""
};

export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY || ""
};

export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
