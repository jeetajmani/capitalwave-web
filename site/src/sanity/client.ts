import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "8h2ezv9l",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});