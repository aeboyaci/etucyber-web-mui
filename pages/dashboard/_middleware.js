import {NextResponse} from "next/server";

export async function middleware(req, ev) {
    console.log(req.cookies);

    const response = await fetch("https://api.etucyber.com/api/account/validate", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache',
            'cookie': `token=${req.cookies["token"]}`
        },
        credentials: "include",
    });
    const data = await response.json();

    console.log(data);

    if (!data.success){
        return NextResponse.redirect("/account/sign-in");
    }
}
