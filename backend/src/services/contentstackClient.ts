import contentstack from "contentstack";
import dotenv from "dotenv";

const stack = contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY!,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT!,
});

export async function fetchEntries(contentType: string, query: any = {}) {
  const Query = stack.ContentType(contentType).Query();

  if (query.uid) {
    Query.where("uid", query.uid);
  }
  return Query.find().then((result: any) => result[0]);
}
