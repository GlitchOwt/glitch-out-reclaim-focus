import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
// Get secrets from environment variables
const SMTP_HOST = Deno.env.get("SMTP_HOST");
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT"));
const SMTP_USER = Deno.env.get("SMTP_USER");
const SMTP_PASS = Deno.env.get("SMTP_PASS");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL");
const FROM_NAME = Deno.env.get("FROM_NAME");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  try {
    const { postId } = await req.json();
    if (!postId) return new Response("Missing postId", {
      status: 400,
      headers: corsHeaders,
    });
    // Fetch the blog post from Supabase
    const { data: post, error: postError } = await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/blog_posts?id=eq.${postId}`, {
      headers: {
        apikey: Deno.env.get("SUPABASE_ANON_KEY"),
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`
      }
    }).then((r) => r.json().then((d) => ({
      data: d[0],
      error: null
    })));
    if (!post || postError) return new Response("Blog post not found", {
      status: 404,
      headers: corsHeaders,
    });
    // Fetch all subscribers (no verified filter)
    const { data: subscribers, error: subError } = await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/subscribers?select=email`, {
      headers: {
        apikey: Deno.env.get("SUPABASE_ANON_KEY"),
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`
      }
    }).then((r) => r.json().then((d) => ({
      data: d,
      error: null
    })));
    if (!subscribers || subError) return new Response("No subscribers found", {
      status: 404,
      headers: corsHeaders,
    });
    // Prepare SMTP client
    const client = new SmtpClient();
    await client.connectTLS({
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      username: SMTP_USER,
      password: SMTP_PASS
    });
    // Send email to each subscriber
    for (const sub of subscribers) {
      await client.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: sub.email,
        subject: post.title,
        content: post.html_content,
        html: post.html_content
      });
    }
    await client.close();
    return new Response("Newsletter sent to all subscribers!", {
      status: 200,
      headers: corsHeaders,
    });
  } catch (e) {
    return new Response(`Error: ${e.message || e}`, {
      status: 500,
      headers: corsHeaders,
    });
  }
});
