import OpenAI from 'openai';

import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env['OPEN_API_SECRET'],
});

const response = await client.responses.create({
  model: 'gpt-5.5',
  instructions: 'none',
  input: 'how much does an iphone 16 plus a half eaten banana cost',
});

console.log(response.output_text);
