import winston, { createLogger, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "scholib web service" },
  transports: [
    // new winston.transports.File({ filename: 'app.log' }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
      level:"info",
    format: winston.format.simple(),
  }));
}
export default logger;
