export async function POST(req: Request) {
    const body = await req.json();
    try {
        const resp = await fetch(`${process.env.API_URL}/user/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (resp.ok) {
            const data = await resp.json();
            const cookies = [
                `access_token=${data.access}; HttpOnly; SameSite=Strict; Path=/`,
                `refresh_token=${data.refresh}; HttpOnly; SameSite=Strict; Path=/`,
            ];
            const joinedCookies = cookies.join(', ');
            return new Response(JSON.stringify(data), {
                status: resp.status,
                statusText: resp.statusText,
                headers: { 'Set-Cookie': joinedCookies },
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
