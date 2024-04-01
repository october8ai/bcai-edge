import { v4 as uuidv4 } from 'uuid';

interface Env {
	// Add any environment variables here
}

async function handleRequest(request: Request, env: Env) {
	const url = new URL(request.url);
	url.hostname = '8fd081.myshopify.com';
	url.protocol = 'https:';

	const modifiedRequest = new Request(url.toString(), {
		method: request.method,
		headers: request.headers,
		body: request.body,
		redirect: 'follow',
	});

	const bcaiCookie = request.headers.get('Cookie')?.match(/_bcai_z=([^;]+)/);
	const bcaiUUID = bcaiCookie ? bcaiCookie[1] : uuidv4();

	const response = await fetch(modifiedRequest);
	const modifiedResponse = new Response(response.body, response);

	// Add Cloudflare's caching headers
	modifiedResponse.headers.set('Cache-Control', 'public, max-age=1800');

	// Set the X-BCAI cookie with the UUID
	modifiedResponse.headers.append(
		'Set-Cookie',
		`_bcai_z=${bcaiUUID}; Path=/; Max-Age=31536000; SameSite=Lax;Domain=.june1stpartners.com;`
	);

	return modifiedResponse;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return handleRequest(request, env);
	},
};
