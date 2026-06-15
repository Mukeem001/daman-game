// vite.config.ts
import "file:///C:/Users/mohdm/OneDrive/Desktop/Matka-Admin-Panel-3-master%20-%20Copy/node_modules/dotenv/config.js";
import { defineConfig } from "file:///C:/Users/mohdm/OneDrive/Desktop/Matka-Admin-Panel-3-master%20-%20Copy/artifacts/admin-panel/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/mohdm/OneDrive/Desktop/Matka-Admin-Panel-3-master%20-%20Copy/artifacts/admin-panel/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/Users/mohdm/OneDrive/Desktop/Matka-Admin-Panel-3-master%20-%20Copy/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\mohdm\\OneDrive\\Desktop\\Matka-Admin-Panel-3-master - Copy\\artifacts\\admin-panel";
var rawPort = process.env.PORT;
var port = rawPort ? Number(rawPort) : 5173;
if (rawPort && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}
var basePath = process.env.BASE_PATH ?? "/";
var vite_config_default = defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "@assets": path.resolve(__vite_injected_original_dirname, "..", "..", "attached_assets"),
      "react": path.resolve(__vite_injected_original_dirname, "../../node_modules/react"),
      "react-dom": path.resolve(__vite_injected_original_dirname, "../../node_modules/react-dom")
    },
    dedupe: ["react", "react-dom"]
  },
  root: path.resolve(__vite_injected_original_dirname),
  build: {
    outDir: path.resolve(__vite_injected_original_dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"]
    },
    proxy: {
      // Proxy API requests to the backend server.
      "/api": {
        target: process.env.VITE_API_BASE_URL || "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "/api")
      }
    }
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtb2hkbVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXE1hdGthLUFkbWluLVBhbmVsLTMtbWFzdGVyIC0gQ29weVxcXFxhcnRpZmFjdHNcXFxcYWRtaW4tcGFuZWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1vaGRtXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcTWF0a2EtQWRtaW4tUGFuZWwtMy1tYXN0ZXIgLSBDb3B5XFxcXGFydGlmYWN0c1xcXFxhZG1pbi1wYW5lbFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbW9oZG0vT25lRHJpdmUvRGVza3RvcC9NYXRrYS1BZG1pbi1QYW5lbC0zLW1hc3RlciUyMC0lMjBDb3B5L2FydGlmYWN0cy9hZG1pbi1wYW5lbC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBcImRvdGVudi9jb25maWdcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG4vLyBEZWZhdWx0IHRoZSBkZXYgcG9ydCBhbmQgYmFzZSBwYXRoIHNvIHRoZSBsb2NhbCBkZXYgc2VydmVyIGNhbiBzdGFydFxyXG4vLyBldmVuIHdoZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzIGFyZSBub3QgcHJvdmlkZWQuXHJcbmNvbnN0IHJhd1BvcnQgPSBwcm9jZXNzLmVudi5QT1JUO1xyXG5jb25zdCBwb3J0ID0gcmF3UG9ydCA/IE51bWJlcihyYXdQb3J0KSA6IDUxNzM7XHJcblxyXG5pZiAocmF3UG9ydCAmJiAoTnVtYmVyLmlzTmFOKHBvcnQpIHx8IHBvcnQgPD0gMCkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgUE9SVCB2YWx1ZTogXCIke3Jhd1BvcnR9XCJgKTtcclxufVxyXG5cclxuY29uc3QgYmFzZVBhdGggPSBwcm9jZXNzLmVudi5CQVNFX1BBVEggPz8gXCIvXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IGJhc2VQYXRoLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICB0YWlsd2luZGNzcygpLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShpbXBvcnQubWV0YS5kaXJuYW1lLCBcInNyY1wiKSxcclxuICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShpbXBvcnQubWV0YS5kaXJuYW1lLCBcIi4uXCIsIFwiLi5cIiwgXCJhdHRhY2hlZF9hc3NldHNcIiksXHJcbiAgICAgIFwicmVhY3RcIjogcGF0aC5yZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0XCIpLFxyXG4gICAgICBcInJlYWN0LWRvbVwiOiBwYXRoLnJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSwgXCIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tXCIpLFxyXG4gICAgfSxcclxuICAgIGRlZHVwZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXHJcbiAgfSxcclxuICByb290OiBwYXRoLnJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSksXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogcGF0aC5yZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsIFwiZGlzdC9wdWJsaWNcIiksXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICBtaW5pZnk6IFwidGVyc2VyXCIsXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydCxcclxuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxyXG4gICAgYWxsb3dlZEhvc3RzOiB0cnVlLFxyXG4gICAgZnM6IHtcclxuICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICBkZW55OiBbXCIqKi8uKlwiXSxcclxuICAgIH0sXHJcbiAgICBwcm94eToge1xyXG4gICAgICAvLyBQcm94eSBBUEkgcmVxdWVzdHMgdG8gdGhlIGJhY2tlbmQgc2VydmVyLlxyXG4gICAgICBcIi9hcGlcIjoge1xyXG4gICAgICAgIHRhcmdldDogcHJvY2Vzcy5lbnYuVklURV9BUElfQkFTRV9VUkwgfHwgXCJodHRwOi8vbG9jYWxob3N0OjQwMDBcIixcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiL2FwaVwiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwcmV2aWV3OiB7XHJcbiAgICBwb3J0LFxyXG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXHJcbiAgICBhbGxvd2VkSG9zdHM6IHRydWUsXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMmMsT0FBTztBQUNsZCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBUXpDLElBQU0sVUFBVSxRQUFRLElBQUk7QUFDNUIsSUFBTSxPQUFPLFVBQVUsT0FBTyxPQUFPLElBQUk7QUFFekMsSUFBSSxZQUFZLE9BQU8sTUFBTSxJQUFJLEtBQUssUUFBUSxJQUFJO0FBQ2hELFFBQU0sSUFBSSxNQUFNLHdCQUF3QixPQUFPLEdBQUc7QUFDcEQ7QUFFQSxJQUFNLFdBQVcsUUFBUSxJQUFJLGFBQWE7QUFFMUMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFxQixLQUFLO0FBQUEsTUFDNUMsV0FBVyxLQUFLLFFBQVEsa0NBQXFCLE1BQU0sTUFBTSxpQkFBaUI7QUFBQSxNQUMxRSxTQUFTLEtBQUssUUFBUSxrQ0FBcUIsMEJBQTBCO0FBQUEsTUFDckUsYUFBYSxLQUFLLFFBQVEsa0NBQXFCLDhCQUE4QjtBQUFBLElBQy9FO0FBQUEsSUFDQSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsRUFDL0I7QUFBQSxFQUNBLE1BQU0sS0FBSyxRQUFRLGdDQUFtQjtBQUFBLEVBQ3RDLE9BQU87QUFBQSxJQUNMLFFBQVEsS0FBSyxRQUFRLGtDQUFxQixhQUFhO0FBQUEsSUFDdkQsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxJQUFJO0FBQUEsTUFDRixRQUFRO0FBQUEsTUFDUixNQUFNLENBQUMsT0FBTztBQUFBLElBQ2hCO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVE7QUFBQSxRQUNOLFFBQVEsUUFBUSxJQUFJLHFCQUFxQjtBQUFBLFFBQ3pDLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsTUFBTTtBQUFBLE1BQ2xEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsRUFDaEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
