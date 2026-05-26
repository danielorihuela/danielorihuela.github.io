import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export interface RepositoryData {
    name: string;
    url: string;
    language: string;
    prs: PrData[];
}

export interface PrData {
    id: number;
    title: string;
    mergedAt: string;
}

interface RepositoryResponse {
    repository: {
        name: string;
        url: string;
        primaryLanguage: {
            name: string;
        };
        pullRequests: {
            pageInfo: {
                hasNextPage: boolean;
                endCursor: string;
            };
            nodes: {
                number: number;
                title: string;
                mergedAt: string;
                author: {
                    login: string;
                };
            }[];
        };
    };
}

export async function fetchProjectContributions(
    owner: string,
    repo: string,
    author: string,
    lastSyncAt: string | null = null,
): Promise<RepositoryData> {
    let repoResponse: RepositoryResponse;
    let contributedPrs: PrData[] = [];

    let hasNextPage = true;
    let cursor = null;

    do {
        console.log(`Fetching ${owner}/${repo}...`)
        repoResponse = await fetchRepo(owner, repo, cursor);
        let prsResponse = repoResponse.repository.pullRequests.nodes;

        if (prsResponse.length === 0) {
            hasNextPage = false;
            break;
        }

        if (lastSyncAt && reachedLastSync(prsResponse[0].mergedAt, lastSyncAt)) {
            console.log(`Reached last sync at ${lastSyncAt}`);
            break;
        }

        const authoredPrs: PrData[] = prsResponse.filter((pr) => pr.author != null).filter((pr) =>
            pr.author.login.toLowerCase() === author.toLowerCase()
        ).map((pr) => ({
            id: pr.number,
            title: pr.title,
            mergedAt: pr.mergedAt.split("T")[0],
        }));

        ({ hasNextPage, endCursor: cursor } = repoResponse.repository.pullRequests.pageInfo);

        contributedPrs.push(...authoredPrs);
    } while (hasNextPage);

    return {
        name: repoResponse.repository.name,
        url: repoResponse.repository.url,
        language: repoResponse.repository.primaryLanguage?.name?.toUpperCase() || "",
        prs: contributedPrs,
    };
}

async function fetchRepo(owner: string, repo: string, cursor: string | null): Promise<RepositoryResponse> {
    const query = `
        query($repoOwner: String!, $repoName: String!, $cursor: String) {
            repository(owner: $repoOwner, name: $repoName) {
                name
                url
                primaryLanguage {
                    name
                }
                pullRequests(first: 100, after: $cursor, states: [MERGED], orderBy: {field: CREATED_AT, direction: DESC}) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    nodes {
                        number
                        title
                        mergedAt
                        author {
                            login
                        }
                    }
                }
            }
        }
    `;

    let response: Response = await fetch(GITHUB_GRAPHQL_API, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables: {
                repoOwner: owner,
                repoName: repo,
                cursor: cursor,
            },
        }),
    });
    
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    let json = await response.json();
    if (json.errors) {
        return Promise.reject(json.errors);
    }

    return json.data;
}

function reachedLastSync(latestPrDate: string, lastSyncAt: string): boolean {
    const lastPrDate = new Date(latestPrDate);
    const lastSyncDate = new Date(lastSyncAt);
    return lastPrDate < lastSyncDate;
}

// Ensure the code runs if it is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    if (!GITHUB_TOKEN) {
        console.error("Error: GITHUB_TOKEN environment variable is missing.");
        process.exit(1);
    }

    const PROJECTS = [
        { owner: "newrelic", repo: "newrelic-agent-control" },
        { owner: "OpenMined", repo: "SyMPC" },
        { owner: "OpenMined", repo: "sycret" },
        { owner: "OpenMined", repo: "PySyft" },
        { owner: "gitleaks", repo: "gitleaks" },
        { owner: "CISOfy", repo: "lynis" }
    ];

    const username = "danielorihuela";

    (async () => {
        const results = [];
        for (const project of PROJECTS) {
            try {
                const data = await fetchProjectContributions(project.owner, project.repo, username);
                results.push({ ...project, data });
                console.log(`Fetched ${data.prs.length} PRs for ${project.owner}/${project.repo}`);
            } catch (e) {
                console.error(`Failed to fetch ${project.owner}/${project.repo}:`, e);
            }
        }

        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const outputDir = path.join(__dirname, '..', 'data');
        const outputFile = path.join(outputDir, 'github-contributions.json');

        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
        console.log(`\nSuccessfully saved all contributions to ${outputFile}`);
    })();
}
