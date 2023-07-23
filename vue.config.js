const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/lbdemo": {
        target: "https://content.launchbrightly.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lbdemo/, ""),
      },
    },
  },
});
