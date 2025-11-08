import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      prompt, 
      viralityLevel, 
      controversyLevel, 
      spiceLevel, 
      debateLevel, 
      politicalLevel, 
      contentType 
    } = await req.json();

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('[AI Content] Generating ideas with params:', {
      prompt,
      viralityLevel,
      controversyLevel,
      contentType
    });

    // Create dynamic system prompt based on parameters
    const systemPrompt = `You are an expert content strategist specializing in viral content creation. Generate 3-5 unique content ideas based on the following parameters:

PARAMETERS:
- User Prompt: "${prompt || 'general content creation'}"
- Virality Level: ${viralityLevel}%
- Controversy Level: ${controversyLevel}%
- Spice Level: ${spiceLevel}%
- Debate Potential: ${debateLevel}%
- Political Content: ${politicalLevel}%
- Content Type: ${contentType}

For each idea, provide:
1. A catchy title incorporating the user's prompt
2. A detailed description (2-3 sentences)
3. Virality score (15-95)
4. Controversy level
5. Engagement potential score
6. Target audience description
7. 4 compelling hooks/titles

Format the response as a JSON array of objects with this structure:
{
  "title": "string",
  "description": "string",
  "viralityScore": number,
  "controversyLevel": number,
  "engagementPotential": number,
  "targetAudience": "string",
  "contentType": "string",
  "hooks": ["string", "string", "string", "string"]
}

Generate truly unique, actionable ideas that align with the parameters. Be creative and specific.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI Content] Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[AI Content] Gemini response received');

    let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                      generatedText.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      generatedText = jsonMatch[1];
    }

    // Try to parse as JSON array
    let ideas;
    try {
      ideas = JSON.parse(generatedText);
      if (!Array.isArray(ideas)) {
        ideas = [ideas];
      }
    } catch (parseError) {
      console.error('[AI Content] JSON parse error:', parseError);
      // Fallback: create structured response from text
      ideas = [{
        title: "AI-Generated Content Idea",
        description: generatedText.substring(0, 200),
        viralityScore: Math.floor(Math.random() * 30 + 60),
        controversyLevel: controversyLevel,
        engagementPotential: Math.floor(Math.random() * 30 + 60),
        targetAudience: "General audience 18-35",
        contentType: contentType,
        hooks: [
          "Discover this viral content strategy...",
          "What they don't tell you about...",
          "I tested this for 30 days...",
          "This changed everything..."
        ]
      }];
    }

    console.log('[AI Content] Generated', ideas.length, 'ideas');

    return new Response(JSON.stringify({ ideas }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[AI Content] Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        ideas: [] 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
