import pgPromise from 'pg-promise'

const pgp = pgPromise()

export const db = pgp({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE
})
