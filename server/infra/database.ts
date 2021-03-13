import pgPromise, { IDatabase } from 'pg-promise'

const pgp = pgPromise()

export function generateDatabase<T> ():IDatabase<T> {
  return pgp<T>({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE
  })
}
