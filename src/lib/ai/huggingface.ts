const HF_API_KEY = process.env.HF_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1/v1/chat/completions';

export interface BioGenerationOptions {
  profession?: string;
  skills?: string[];
  experience?: string;
  tone?: 'professional' | 'casual' | 'creative';
  maxLength?: number;
}

async function generateBio(options: BioGenerationOptions): Promise<string> {
  if (!HF_API_KEY) {
    throw new Error('Hugging Face API key is not configured');
  }

  const {
    profession = 'Software Developer',
    skills = [],
    experience = '5 years',
    tone = 'professional',
    maxLength = 200,
  } = options;

  const toneDescriptions = {
    professional: 'professional and polished',
    casual: 'friendly and approachable',
    creative: 'unique and creative',
  };

  const prompt = `Create a ${toneDescriptions[tone]} professional bio for a ${profession} with ${experience} of experience. 
${skills.length > 0 ? `Their skills include: ${skills.join(', ')}.` : ''}
The bio should be around ${maxLength} characters, engaging, and suitable for a professional profile.
Only provide the bio text, no other content.`;

  try {
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
        max_tokens: Math.ceil(maxLength / 4) + 50,
        temperature: 0.7,
        top_p: 0.95,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate bio');
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || '';
    return generatedText.trim();
  } catch (error) {
    console.error('Bio generation error:', error);
    throw error;
  }
}

export { generateBio };
