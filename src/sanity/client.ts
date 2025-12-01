import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "zcmn8w05",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});