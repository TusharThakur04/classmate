import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = "https://models.github.ai/inference";

const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error("github-llm token error");
}

const client = ModelClient(endpoint, new AzureKeyCredential(token));

export default client;
