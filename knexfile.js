// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '192.168.99.100',
      port : '5432',
      user : 'postgres',
      password : 'docker',
      database : 'knexDatabase'
    },
    migrations: {
      tableName: 'migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    },
  },
  onUpdateTrigger: table => 
  `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `
};
