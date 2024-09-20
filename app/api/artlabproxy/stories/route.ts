import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: Request) {
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
