import resolve, { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import json from '@rollup/plugin-json';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      json(),
      resolve({
          ignoreGlobal: false,
          include: ['node_modules/**'],
          skip: ['react', 'react-dom'],
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: true, // Extracts CSS into a separate file
        minimize: true, // Minimize the output CSS
      }),
      terser(),
      
    ],
    external: ['react', 'react-dom'], // Mark React and ReactDOM as external

  },
  {
    input: "./src/styles/main.css",
    output: [{ file: "build/index.css", format: "es" }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
];
