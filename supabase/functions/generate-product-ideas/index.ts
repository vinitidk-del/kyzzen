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
    const { audienceDescription, brandName, brandProduct } = await req.json();

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('[Product Ideas] Generating for brand:', brandName);

    const systemPrompt = `You are a product innovation expert specializing in creator brands and merchandising. Generate 3 unique product ideas for a creator brand.

BRAND CONTEXT:
- Brand Name: ${brandName || 'Creator Brand'}
- Current Product: ${brandProduct || 'Content creation'}
- Audience: ${audienceDescription}

For each product idea, provide:
1. Product Name (catchy and memorable)
2. Concept Description (2-3 sentences explaining the product)
3. Suggested Price Point
4. Estimated Profit Margin
5. Target Market Fit Score (0-100)
6. Unique Selling Points (2-3 bullet points)

Format the response as a JSON array with this structure:
{
  "name": "string",
  "concept": "string",
  "price": "string (e.g., $49.99 or $29.99/month)",
  "margin": "string (e.g., 65%)",
  "marketFit": number,
  "usp": ["string", "string", "string"]
}

Make the ideas practical, profitable, and aligned with the audience description. Be creative but realistic.`;

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
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1500,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Product Ideas] Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[Product Ideas] Gemini response received');

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
      console.error('[Product Ideas] JSON parse error:', parseError);
      // Fallback: create basic structured response
      ideas = [{
        name: "Creator Merchandise Pack",
        concept: generatedText.substring(0, 200),
        price: "$49.99",
        margin: "60%",
        marketFit: 75,
        usp: [
          "Designed specifically for your audience",
          "High-quality materials and branding",
          "Strong profit margins"
        ]
      }];
    }

    console.log('[Product Ideas] Generated', ideas.length, 'product ideas');

    return new Response(JSON.stringify({ ideas }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[Product Ideas] Error:', error);
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
