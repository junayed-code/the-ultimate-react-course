import fs from "node:fs";
import chalk from "chalk";
import { resolve } from "node:path";
import { parseArgs } from "node:util";

import { createApp } from "./app.js";
import JSONDatabase from "./lib/JSONDatabase.js";

function args() {
  try {
    const { values, positionals } = parseArgs({
      options: {
        port: {
          type: "string",
          short: "p",
          default: "5000",
        },
        wait: {
          type: "string",
          default: "0",
        },
      },
      allowPositionals: true,
    });
    return { ...values, filepath: positionals[0] ?? `` };
  } catch (error) {
    if (error.code === "ERR_PARSE_ARGS_UNKNOWN_OPTION") {
      console.log(
        `${chalk.redBright("ArgsOptionError:")} ${chalk.white(
          error.message.split(".")[0]
        )}.`
      );
    }
    process.exit(1);
  }
}

const { port, wait, filepath } = args();

if (!fs.existsSync(resolve(filepath))) {
  console.log(chalk.red(`The file of '${filepath}' is not found.`));
  process.exit(1);
}

// Create a JSON database
const db = new JSONDatabase(filepath);

// Create app to serve the data
const app = createApp(db, { wait });

app.listen(port, () =>
  console.log(
    `\n${chalk.white(`Server is running at`)} ${chalk.underline(
      chalk.gray(`http://localhost:${port}`)
    )}`
  )
);
