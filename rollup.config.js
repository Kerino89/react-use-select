import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import json from "@rollup/plugin-json";
import flatDts from "rollup-plugin-flat-dts";
import ts from "typescript";
import del from "del";

import pkg from "./package.json";

const extensions = [".js", ".ts", ".json"];
const globals = { react: "React" };
const name = pkg.name;

del.sync("dist");

const outputs = [
  {
    file: pkg.main,
    format: "cjs",
  },
  {
    file: pkg.module,
    format: "esm",
  },
  {
    file: pkg.unpkg,
    format: "umd",
    plugins: [flatDts({ tsconfig: "tsconfig.lib.json" })],
  },
];

export default outputs.map((output) => ({
  input: pkg.source,
  output: { sourcemap: true, name, globals, ...output },
  plugins: [
    json(),
    external(),
    typescript({
      typescript: ts,
      tsconfig: "tsconfig.lib.json",
      clean: true,
    }),
    resolve(),
    sourcemaps(),
    output.format === "umd" && commonjs({ include: /\/node_modules\//, extensions }),
  ].filter(Boolean),
}));
