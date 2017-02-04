const fs = require('fs');
fs.writeFile('app.yaml', `runtime: nodejs
env: flex
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
