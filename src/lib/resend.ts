import { Resend } from "resend";
import envConfig from "./envConfig";

export const resend = new Resend(envConfig.resendApiKey);