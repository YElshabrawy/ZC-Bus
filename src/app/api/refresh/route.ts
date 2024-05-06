import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const token = req.cookies.get('refresh_token')?.value;
    if (!token) {
        return new Response(null, {
            status: 401,
            statusText: 'Unauthorized',
        });
    }
    try {
        const resp = await fetch(`${process.env.API_URL}/user/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: token }),
        });
        if (resp.ok) {
            const data = await resp.json();

            return new Response(JSON.stringify(data), {
                status: resp.status,
                statusText: resp.statusText,
                headers: {
                    'Set-Cookie': `access_token=${data.access}; HttpOnly; SameSite=Strict; Path=/`,
                },
            });
        } else {
            return new Response(null, {
                status: resp.status,
                statusText: resp.statusText,
            });
        }
    } catch (error) {
        console.log(error);
        Response.error();
    }
}
