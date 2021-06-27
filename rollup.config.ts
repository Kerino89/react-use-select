import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

import del from "del";

import pkg from "./package.json";

const extensions = [".js", ".ts", ".json"];
const IS_DEV = process.env.NODE_ENV !== "production";

del.sync("dist");

const rollupOptions = {
  input: pkg.source,
  output: [
    {
      sourcemap: IS_DEV,
      file: pkg.main,
      format: "cjs",
      name: pkg.name,
    },
    {
      sourcemap: IS_DEV,
      file: pkg.module,
      format: "es",
      name: pkg.name,
    },
  ],
  plugins: [json(), typescript({ sourceMap: IS_DEV }), resolve(), commonjs({ extensions })],
};

export default rollupOptions;
