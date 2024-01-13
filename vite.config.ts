import { defineConfig } from "@solidjs/start/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "styled-system": path.resolve(__dirname, "./styled-system/")
    }
  }
});
