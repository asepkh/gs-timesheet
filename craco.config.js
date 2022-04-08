const CracoAlias = require("craco-alias"),
  CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@": "./src",
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#677081",
              // "@link-color": "#677081",
              // "@text-color": "#525358",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
