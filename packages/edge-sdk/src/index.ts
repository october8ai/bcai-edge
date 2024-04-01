import {uuid} from '@cfworker/uuid';

export async function setBlackCrowCookie(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const originalHost = url.hostname.replace(/^www\./i, '.');

    const modifiedRequest = new Request(url.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow',
    });

    const bcaiCookie = request.headers.get('Cookie')?.match(/_bcai_z=([^;]+)/);
    const bcaiUUID = bcaiCookie ? bcaiCookie[1] : uuid();

    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);

    // Set the X-BCAI cookie with the UUID
    modifiedResponse.headers.append(
        'Set-Cookie',
        `_bcai_z=${bcaiUUID}; Path=/; Max-Age=31536000; SameSite=Lax; Domain=${originalHost};`
    );

    return modifiedResponse;
}
