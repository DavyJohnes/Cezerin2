import { MongoClient } from "mongodb"
import url from "url"
import winston from "winston"
import settings from "./settings"
import { CA } from '../../../../config/yandex-ca';

const mongodbConnection = settings.mongodbServerUrl
const mongoPathName = url.parse(mongodbConnection).pathname
const dbName = mongoPathName.substring(mongoPathName.lastIndexOf("/") + 1)

const reconnectInterval = 1000
const connectOptions = {
  replSet: {
    sslCA: CA,
  },
  reconnectTries: 3600,
  reconnectInterval,
  useNewUrlParser: true,
}

const onClose = () => {
  winston.info("MongoDB connection was closed")
}

const onReconnect = () => {
  winston.info("MongoDB reconnected")
}

export let db = null;

export const connectWithRetry = () => new Promise<void>((resolve) => {
      MongoClient.connect(mongodbConnection, connectOptions, (error, client) => {
          if (error) {
              winston.error(
                  `MongoDB connection was failed: ${error.message}`,
                  error.message
              )
              setTimeout(connectWithRetry, reconnectInterval)
          } else {
              db = client.db(dbName)

              db.on("close", onClose)
              db.on("reconnect", onReconnect)
              winston.info("MongoDB connected successfully")

              resolve();
          }
      })
  })

// connectWithRetry()
