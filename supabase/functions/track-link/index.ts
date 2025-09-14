import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    if (req.method === 'POST') {
      const { tracking_code, ip_address, user_agent, referrer } = await req.json();

      // Find the conversion link
      const { data: link, error: linkError } = await supabaseClient
        .from('conversion_links')
        .select('*')
        .eq('tracking_code', tracking_code)
        .single();

      if (linkError || !link) {
        return new Response(JSON.stringify({ error: 'Link not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Record the click
      const { error: clickError } = await supabaseClient
        .from('link_clicks')
        .insert({
          link_id: link.id,
          ip_address,
          user_agent,
          referrer,
        });

      if (clickError) {
        console.error('Error recording click:', clickError);
      }

      // Update click count
      const { error: updateError } = await supabaseClient
        .from('conversion_links')
        .update({ clicks: link.clicks + 1 })
        .eq('id', link.id);

      if (updateError) {
        console.error('Error updating click count:', updateError);
      }

      return new Response(JSON.stringify({ 
        success: true, 
        redirect_url: link.original_url 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET request - redirect to original URL
    const url = new URL(req.url);
    const tracking_code = url.searchParams.get('t');

    if (!tracking_code) {
      return new Response('Invalid tracking code', { status: 400 });
    }

    const { data: link, error } = await supabaseClient
      .from('conversion_links')
      .select('*')
      .eq('tracking_code', tracking_code)
      .single();

    if (error || !link) {
      return new Response('Link not found', { status: 404 });
    }

    // Record click and increment counter
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referrer = req.headers.get('referer') || 'direct';

    // Record the click (async, don't wait)
    supabaseClient.from('link_clicks').insert({
      link_id: link.id,
      ip_address: clientIP,
      user_agent: userAgent,
      referrer,
    });

    // Update click count (async, don't wait)
    supabaseClient.from('conversion_links')
      .update({ clicks: link.clicks + 1 })
      .eq('id', link.id);

    // Redirect to original URL
    return Response.redirect(link.original_url, 302);

  } catch (error) {
    console.error('Error in track-link function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});