import { NextResponse } from "next/server";

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

    // Use a fake user ID for now
    const user = "test_user_1";

    // Prepare the payload for the /react endpoint
    const payload = {
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
      body: JSON.stringify(payload),
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
