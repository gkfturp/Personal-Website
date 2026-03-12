import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./config";

export function getClient() {
  if (!projectId) {
    throw new Error("Missing SANITY_PROJECT_ID");
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  });
}

export function getTokenClient() {
  if (!projectId || !process.env.SANITY_READ_TOKEN) {
    throw new Error("Missing SANITY credentials");
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_READ_TOKEN,
  });
}
