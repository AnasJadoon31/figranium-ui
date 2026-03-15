import fs from "fs";

async function updateReleases() {
  console.log("Fetching latest releases from GitHub...");
  try {
    const response = await fetch(
      "https://api.github.com/repos/figranium/figranium/releases",
      {
        headers: {
          "User-Agent": "node.js",
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Error: Expected an array of releases, got:", data);
      process.exit(1);
    }

    const mapped = data.map((r) => ({
      id: r.id,
      version: r.tag_name,
      title: r.name,
      body: r.body,
      publishedAt: r.published_at,
      authorName: r.author ? r.author.login : "unknown",
      releaseUrl: r.html_url,
    }));

    fs.writeFileSync("data/releases.json", JSON.stringify(mapped, null, 2));
    console.log(
      `Successfully updated data/releases.json with ${mapped.length} releases.`,
    );
  } catch (err) {
    console.error("Fetch failed:", err);
    process.exit(1);
  }
}

updateReleases();
