import { NextResponse } from "next/server";
import * as jose from "jose";

// JWKS endpoint for social logins
const JWKS_URL = "https://api-auth.web3auth.io/jwks";

export const revalidate = 0;

export async function GET() {
  const apiUrl =
    "https://edenartlab--abraham-fastapi-app.modal.run/get_stories";

  try {
    // Fetch stories from the external API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching stories: ${response.statusText}`);
    }

    const stories = await response.json();
    return NextResponse.json(stories, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching stories:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { story_id, action } = body;

    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jwks = jose.createRemoteJWKSet(new URL(JWKS_URL));
    const { payload } = await jose.jwtVerify(token, jwks, {
      algorithms: ["ES256"],
    });

    const wallets = payload.wallets as Array<{
      type: string;
      public_key: string;
    }>;
    const userPublicKey = wallets?.find(
      (x) => x.type === "web3auth_app_key"
    )?.public_key;

    if (!userPublicKey) {
      return NextResponse.json(
        { error: "Invalid JWT or public key not found" },
        { status: 400 }
      );
    }
    console.log("Payload:", payload);
    console.log("User public key:", userPublicKey);

    // Use a fake user ID for now
    const user = "test_user_1"; // use an actual identifier like public key or user ID

    // Prepare the payload for the /react endpoint
    const actionData = {
      story_id,
      action,
      user,
    };

    // Send a POST request to the /react endpoint
    const apiUrl = "https://edenartlab--abraham-fastapi-app.modal.run/react";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ABRAHAM_ADMIN_KEY}`,
      },
      body: JSON.stringify(actionData),
    });

    if (!response.ok) {
      throw new Error(`Error reacting to story: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error processing POST request:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
