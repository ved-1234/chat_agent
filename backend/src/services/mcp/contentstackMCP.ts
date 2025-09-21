import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import Contentstack from "contentstack";

const stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY!,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT!,
});

const emptyZodSchema = z.object({});
const emptyJsonSchema = zodToJsonSchema(emptyZodSchema, "EmptySchema");

// Create server
const server = new Server({
  name: "contentstack-mcp",
  version: "1.0.0",
});

// Define FAQ tool
const getFAQs: Tool = {
  name: "getFAQs",
  description: "Fetch FAQ entries from Contentstack",
  inputSchema: emptyJsonSchema,
  execute: async () => {
    const Query = stack.ContentType("faq").Query();
    const [entries] = await Query.toJSON().find();
    return { content: entries };
  },
};

// Define Blog tool
const getBlogs: Tool = {
  name: "getBlogs",
  description: "Fetch Blog entries from Contentstack",
  inputSchema: emptyJsonSchema,
  execute: async () => {
    const Query = stack.ContentType("blog").Query();
    const [entries] = await Query.toJSON().find();
    return { content: entries };
  },
};

// Define Product tool
const getProducts: Tool = {
  name: "getProducts",
  description: "Fetch Product entries from Contentstack",
  inputSchema: emptyJsonSchema,
  execute: async () => {
    const Query = stack.ContentType("product").Query();
    const [entries] = await Query.toJSON().find();
    return { content: entries };
  },
};

// Register tools
server.use(getFAQs);
server.use(getBlogs);
server.use(getProducts);

// Start server
server.listen();
