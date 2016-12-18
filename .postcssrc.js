module.exports = {
  "input": "src/client/styles/index.css",
  "output": "dist/public/index.css",
  "use": [
    "postcss-easy-import",
    "postcss-simple-vars",
    "postcss-nested",
    "autoprefixer",
    "cssnano"
  ],
  "postcss-easy-import": {
    "glob": true,
    "onImport": (sources) => {
      global.watchCSS(sources, this.from);
    }
  },
  "autoprefixer": {
    "browsers": ["last 2 versions"]
  }
};
