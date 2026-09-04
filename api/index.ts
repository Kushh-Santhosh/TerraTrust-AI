import server from "../dist/server/server.js";

type VercelRequest = {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string) => void;
  end: (body?: string | Uint8Array) => void;
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const protocol = headerValue(request.headers["x-forwarded-proto"]) ?? "https";
  const host = headerValue(request.headers.host) ?? "localhost";
  const forwardedPath = queryValue(request.query?.__path) ?? "/";
  const requestUrl = new URL(forwardedPath, `${protocol}://${host}`);
  const headers = new Headers();

  for (const [name, value] of Object.entries(request.headers)) {
    if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(", ") : value);
  }

  const method = request.method ?? "GET";
  const body = method === "GET" || method === "HEAD" ? undefined : bodyValue(request.body);
  const result = await server.fetch(
    new Request(requestUrl, { method, headers, body }),
    process.env,
    {},
  );

  response.status(result.status);
  result.headers.forEach((value, name: string) => response.setHeader(name, value));
  response.end(new Uint8Array(await result.arrayBuffer()));
}

function headerValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function queryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function bodyValue(body: unknown): string | undefined {
  if (body === undefined) return undefined;
  return typeof body === "string" ? body : JSON.stringify(body);
}