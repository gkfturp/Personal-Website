import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../src/sanity/schemas";

const projectId = "wxh5f4jr";
const dataset = "production";

export default defineConfig({
  name: "studio",
  title: "Zesen Portfolio Studio",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
