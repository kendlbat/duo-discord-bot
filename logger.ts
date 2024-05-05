import winston from "winston";

const customFormat = winston.format.printf(
    ({ level, message, timestamp, stack }) => {
        if (stack) {
            // print log trace
            return `${timestamp} ${level}: ${message} - ${stack}`;
        }
        return `${timestamp} ${level}: ${message}`;
    }
);

const log_level = process.env.LOG_LEVEL || "info";

export const logger = winston.createLogger({
    level: log_level,
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.mmm" }),
        winston.format.colorize(),
        customFormat
    ),
    transports: [new winston.transports.Console()],
});
