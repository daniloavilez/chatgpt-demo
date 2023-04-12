/* eslint-disable camelcase */
import fs from "fs";
import * as url from "url";

import { Configuration, OpenAIApi } from "openai";

import { envConfig } from "./config.js";

const configuration = new Configuration({
  organization: envConfig.orgId,
  apiKey: envConfig.openaiApiKey
});

const openai = new OpenAIApi(configuration);

async function listEngines() {
  const response = await openai.listEngines();

  console.log(response);
}

async function chat() {
  const request = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Talk with me"
      }
    ],
    temperature: 0.7
  };

  const response = await openai.createChatCompletion(request);

  console.log("Reponse", response.data);
}

async function generateTlDr(text) {
  const request = {
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 1
  };

  const response = await openai.createCompletion(request);

  console.log("Response", response.data);
}

const news = fs.readFileSync(
  url.fileURLToPath(new URL("./news/urgent_ios_patch.txt", import.meta.url)),
  { encoding: "utf-8" }
);

generateTlDr(news);
