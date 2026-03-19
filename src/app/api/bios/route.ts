import { NextRequest, NextResponse } from 'next/server';

const HF_API_KEY = process.env.NEXT_PUBLIC_HF_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1/v1/chat/completions';

// Mock cache for demos
const bioCache = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      profession = 'Software Developer',
      skills = [],
      experience = '5 years',
      tone = 'professional',
      maxLength = 200,
      count = 3,
    } = body;

    if (!profession) {
      return NextResponse.json(
        { error: 'Profession is required' },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = `${profession}-${experience}-${tone}`;
    if (bioCache.has(cacheKey)) {
      return NextResponse.json({ bios: bioCache.get(cacheKey) });
    }

    if (!HF_API_KEY) {
      // Return mock bios for demo
      const mockBios = Array(count)
        .fill(null)
        .map((_, i) => {
          const tones = {
            professional: `Dedicated ${profession} with ${experience} of experience in building scalable solutions.`,
            casual: `Passionate ${profession} who loves coding and solving interesting problems.`,
            creative: `Innovative ${profession} combining technical expertise with creative thinking.`,
          };
          return tones[tone as keyof typeof tones] || tones.professional;
        });

      bioCache.set(cacheKey, mockBios);
      return NextResponse.json({ bios: mockBios });
    }

    const toneDescriptions = {
      professional: 'professional and polished',
      casual: 'friendly and approachable',
      creative: 'unique and creative',
    };

    const prompt = `Create ${count} different ${toneDescriptions[tone as keyof typeof toneDescriptions] || 'professional'} professional bios for a ${profession} with ${experience} of experience. 
${skills.length > 0 ? `Their skills include: ${skills.join(', ')}.` : ''}
Each bio should be around ${maxLength} characters, engaging, and suitable for a professional profile.
Format: Return exactly ${count} bios, one per line, numbered (1. 2. 3. etc).
Only provide the bios, no other content.`;

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: Math.ceil((maxLength / 4) * count) + 100,
        temperature: 0.7,
        top_p: 0.95,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Hugging Face API error:', error);
      // Fallback to mock data
      const mockBios = Array(count)
        .fill(null)
        .map((_, i) => `${i + 1}. Professional ${profession} with ${experience} of experience`);
      bioCache.set(cacheKey, mockBios);
      return NextResponse.json({ bios: mockBios });
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || '';
    const bios = generatedText
      .split('\n')
      .filter((line: string) => line.trim())
      .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, count);

    bioCache.set(cacheKey, bios);
    return NextResponse.json({ bios });
  } catch (error) {
    console.error('POST /api/bios error:', error);
    return NextResponse.json(
      { error: 'Failed to generate bios' },
      { status: 500 }
    );
  }
}
