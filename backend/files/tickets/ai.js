import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai";
import { configDotenv } from "dotenv";
configDotenv();
const genAI = new GoogleGenerativeAI(process.env.aikey);

const SYSTEM_PROMPT = `You are a support ticket triage assistant. Your job is to read a ticket and assign exactly ONE urgency level.

Urgency levels (choose only one):
- URGENT: System down, data loss, security breach, or complete loss of service affecting many users. Requires immediate action.
- HIGH: Major feature broken, significant business impact, no workaround available. Needs attention within hours.
- MEDIUM: Feature impaired but a workaround exists, or moderate impact on a subset of users. Handle within 1-2 business days.
- LOW: Cosmetic issues, questions, feature requests, minor inconveniences, or no real business impact.

Rules:
- Return ONLY valid JSON. No extra text.
- Choose exactly one level from: URGENT, HIGH, MEDIUM, LOW.
- Base the decision on impact and scope, not on the emotional tone of the writer.
- If the ticket is too vague to judge, use MEDIUM and note it.

Output format:
{
  "urgency": "URGENT" | "HIGH" | "MEDIUM" | "LOW",
  "reason": "one short sentence explaining the choice",
  "confidence": 0.0-1.0
}`;

const model = genAI.getGenerativeModel({
  model: "gemini-3.8-flash",
  systemInstruction: SYSTEM_PROMPT,
  generationConfig: {
    temperature: 0,
    responseMimeType: "application/json",
  },
  responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        urgency: {
          type: SchemaType.STRING,
          enum: ["URGENT", "HIGH", "MEDIUM", "LOW"],
        },
        reason: { type: SchemaType.STRING },
        confidence: { type: SchemaType.NUMBER },
      },
      required: ["urgency", "reason", "confidence"],
    }
});

export async function classifyTicket(data) {
try{
  const result = await model.generateContent(
    `Classify the urgency of this ticket:\n"""\n${data.description}\n"""`
  );
  console.log("response is "+result.response.text());
  console.log(JSON.parse(result.response.text()))
  return {data:JSON.parse(result.response.text()),status:200};
}
  catch(error){
    console.log("error",error)
 return {status:500};

  }
}

// Quick test when run directly
// if (import.meta.url === `file://${process.argv[1]}`) {
//   const sample =
//     "The payment gateway is returning errors for all checkouts. Customers can't pay.";
//   const result = await classifyTicket(sample);
//   console.log(result);
// }