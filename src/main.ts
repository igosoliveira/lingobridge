import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { Server } from "./infrastructure/http/express/server";

Server.start();
