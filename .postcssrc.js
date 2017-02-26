module.exports = {
  from: './src/styles/index.css',
  to: './dist/public/index.css',
  plugins: {
    'postcss-easy-import': {
      glob: true,
      onImport: sources => {
        console.log('import');
        // global.watchCSS(sources, this.from);
      },
    },
    'postcss-simple-vars': null,
    'postcss-nested': null,
    'autoprefixer': {
      browsers: ['last 2 versions'],
    },
    'cssnano': null,
  },
};
