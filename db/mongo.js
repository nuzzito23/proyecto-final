import mongoose from 'mongoose'
const uri = process.env.MONGO_URI 
const dbName = process.env.MONGO_DBNAME 
export async function connect() {
  mongoose.Promise = global.Promise
  mongoose.connect(uri, {
    dbName: dbName
  })
  mongoose.connection
    .on('open', () => {
      console.log('connected to database')
    })
    .on('error', () => {
      console.log('connection error')
    })
}