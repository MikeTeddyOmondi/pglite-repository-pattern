import { pino } from "pino";
import { join } from "path";
import { cwd } from "process";

// TODO: Debug why pino-pretty target field failing to insert logs to logFile
// const logDir = join(cwd(), '..', 'logs');
// const logFile = join(logDir, `logs-${process.pid}.json`);

export const logger = pino({
    transport: {
        targets: [
            {
                level: "warn",
                target: "pino-pretty",
                // target: "pino/file",
                // options: {
                //     destination: logFile,
                // },
            },
            {
                level: "error",
                target: "pino-pretty",
                // target: "pino/file",
                // options: {
                //     destination: logFile,
                // },
            },
            {
                level: "info",
                target: "pino-pretty",
            },
        ],
    },
});