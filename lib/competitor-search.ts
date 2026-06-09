import { CompetitorInsight, DomainAnalysis } from "@/types/validation";

/*
  Competitor search module.

  If SERPAPI_API_KEY exists:
  - It fetches live Google results through SerpAPI.

  If there is no key:
  - It returns a safe fallback based on the domain name.
*/

export async function getCompetitorInsight(
  domainAnalysis: DomainAnalysis
): Promise<CompetitorInsight> {
  const query = `${domainAnalysis.name} startup tool competitors`;
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    return fallbackCompetitors(query);
  }

  try {
    const url = new URL("https://serpapi.com/search");
    url.searchParams.set("engine", "google");
    url.searchParams.set("q", query);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("num", "5");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return fallbackCompetitors(query);
    }

    const data = await response.json();

    const competitors =
      data?.organic_results?.slice(0, 5).map(
        (item: {
          title?: string;
          link?: string;
          snippet?: string;
        }) => ({
          title: item.title || "Untitled competitor result",
          link: item.link || "",
          snippet: item.snippet || "",
        })
      ) || [];

    return {
      source: "serpapi",
      query,
      count: competitors.length,
      competitors,
    };
  } catch {
    return fallbackCompetitors(query);
  }
}

function fallbackCompetitors(query: string): CompetitorInsight {
  return {
    source: "fallback",
    query,
    count: 3,
    competitors: [
      {
        title: "Domain validation tools",
        link: "",
        snippet:
          "Generic competitors include domain checkers, brand name generators, and startup idea validators.",
      },
      {
        title: "Website trust checkers",
        link: "",
        snippet:
          "Trust-focused tools compare security, credibility, and visible website signals.",
      },
      {
        title: "Startup research dashboards",
        link: "",
        snippet:
          "Research tools help founders evaluate market demand and competition before building.",
      },
    ],
  };
}


