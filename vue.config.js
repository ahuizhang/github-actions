module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/": {
        target: "http://localhost:7001",
        changeOrigin: true,
        pathRewrite: {
          "/": "",
        },
      },
    },
  },
};
