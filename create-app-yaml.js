const fs = require('fs');
fs.writeFile('app.yaml', `

runtime: nodejs

env: flex

threadsafe: true

skip_files:
  - ^(.*/)?.*/node_modules/.*$

resources:
  cpu: 0.2
  memory_gb: 0.5
  disk_size_gb: 10

manual_scaling:
  instances: 1

handlers:
- url: /bundle.js
  static_files: dist/public/bundle.js
  upload: dist/public/bundle.js

- url: /index.css
  static_files: dist/public/index.css
  upload: dist/public/index.css

- url: /fonts/materialicons.woff2
  static_files: dist/public/fonts/materialicons.woff2
  upload: dist/public/fonts/materialicons.woff2

- url: /fonts/fonts/NotoSansJP-Bold.woff2
  static_files: dist/public/fonts/fonts/NotoSansJP-Bold.woff2
  upload: dist/public/fonts/fonts/NotoSansJP-Bold.woff2

- url: /fonts/fonts/NotoSansJP-Regular.woff2
  static_files: dist/public/fonts/fonts/NotoSansJP-Regular.woff2
  upload: dist/public/fonts/fonts/NotoSansJP-Regular.woff2

env_variables:
  APPLICATION_URL: '${process.env.APPLICATION_URL}'

  MYSQL_USER: '${process.env.MYSQL_USER}'
  MYSQL_PASSWORD: '${process.env.MYSQL_PASSWORD}'
  MYSQL_DATABASE: '${process.env.MYSQL_DATABASE}'
  MYSQL_SOCKETPATH: '${process.env.MYSQL_SOCKETPATH}'

  SECRET_KEY: '${process.env.SECRET_KEY}'

  TWITTER_KEY: '${process.env.TWITTER_KEY}'
  TWITTER_SECRET: '${process.env.TWITTER_SECRET}'

beta_settings:
  cloud_sql_instances: '${process.env.CLOUD_SQL_INSTANCES}'

`, (err) => {
  if (err) {
    console.log(err);
  }
});
