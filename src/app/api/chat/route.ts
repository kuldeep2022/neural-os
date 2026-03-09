import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'No API key' }, { status: 503 });
  }
  const { message } = await req.json();
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system: 'You are NEURAL AI, an AI assistant integrated into Neural OS, a futuristic browser-based operating system. Keep responses concise and use a slightly technical, futuristic tone. You can help with system questions, coding, and general queries.',
    messages: [{ role: 'user', content: message }],
  });
  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return Response.json({ response: text });
}
