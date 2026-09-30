export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
        return new Response(JSON.stringify({ target_url: null }), { headers: { "Content-Type": "application/json" } });
    }

    try {
        const { results } = await env.DB.prepare(
            "SELECT target_url FROM links WHERE slug = ? LIMIT 1"
        ).bind(slug).all();

        if (results && results.length > 0) {
            return new Response(JSON.stringify({ target_url: results[0].target_url }), { headers: { "Content-Type": "application/json" } });
        }
    } catch (err) {}

    return new Response(JSON.stringify({ target_url: null }), { headers: { "Content-Type": "application/json" } });
}
