import next from "eslint-config-next";
export default [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "node_modules/**",
      ".trae/**",
      "studio/dist/**",
      "studio/node_modules/**",
      "studio/.sanity/**",
    ],
  },
  ...next,
];
