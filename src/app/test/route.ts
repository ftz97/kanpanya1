export async function GET() {
  return new Response(JSON.stringify({ 
    message: "Test API working!", 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV 
  }), {
    headers: { "Content-Type": "application/json" },
  });
}
