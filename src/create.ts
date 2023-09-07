import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { GenerateDefaultText } from "./application/usecases/main/GenerateDefaultText";
import MongoDB from "./infrastructure/repositories/mongodb/mongodb";

MongoDB.connect();

const config = {
  executions: 0,
  maxExecutions: 100,
};
const progress = {
  errors: 0,
  success: 0,
};

const intervalo = setInterval(async () => {
  const textCreated = await GenerateDefaultText.execute("en-US");
  if (textCreated) {
    progress.success++;
  } else {
    progress.errors++;
  }
  config.executions++;
  console.log(`execultando: ${config.executions}`);
  console.log(progress);
  console.log("create text process completed.");
  if (config.executions === config.maxExecutions) {
    console.log(progress);
    clearInterval(intervalo);
    return;
  }
}, 35000);
