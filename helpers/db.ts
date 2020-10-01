import { MongoClient, Database } from 'https://deno.land/x/mongo/mod.ts';

let database: Database;

export function connect() {
  const client = new MongoClient();
  client.connectWithUri(
    '//'
  );

  database = client.database('learning-resources');
}

function getDb() {
  return database;
}

export default getDb;