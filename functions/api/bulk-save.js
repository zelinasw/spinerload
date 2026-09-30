export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const body = await request.json();
        const links = body.links;

        if (!links || !Array.isArray(links)) {
            return new Response(JSON.stringify({ success: false }), { headers: { "Content-Type": "application/json" } });
        }

        for (let item of links) {
            await env.DB.prepare(
                "INSERT OR IGNORE INTO links (slug, target_url) VALUES (?, ?)"
            ).bind(item.slug, item.target_url).run();
        }

        return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { headers: { "Content-Type": "application/json" } });
    }
}
