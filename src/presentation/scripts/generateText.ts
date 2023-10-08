import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });
import MongoDB from "../../infrastructure/repositories/mongodb/mongodb";
import { Create } from "../../application/usecases/main/create";
import { subjects } from "./subjects";


const config = {
  executions: 0,
  maxExecutions: 100,
};

const progress = {
  errors: 0,
  success: 0,
};

let indexSubjects = 0;

const executeCreate = async () => {
  const subject = subjects[indexSubjects++];
  if (indexSubjects > subjects.length - 1) {
    indexSubjects = 0;
  }

  const textCreated = await Create.execute("en-US", subject);

  if (textCreated.error) {
    progress.errors++;
  } else {
    progress.success++;
  }

  config.executions++;
  console.log(`Executing: ${config.executions}`);
  console.log(progress);
  console.log("Create text process completed.");
};

const intervalMilliseconds = 80000;
setInterval(executeCreate, intervalMilliseconds);

MongoDB.connect();
