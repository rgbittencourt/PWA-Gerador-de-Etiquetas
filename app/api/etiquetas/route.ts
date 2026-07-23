const BACKEND_URL = "https://script.google.com/macros/s/AKfycbx0kgIBC28VXALEJDlQaxwj0bWEuprqf3R9iIcvehYFMFli6wEYnQFny06hllpyU-HhnA/exec";

export async function GET(request: Request) {
  const incoming = new URL(request.url);
  const backend = new URL(BACKEND_URL);
  backend.search = incoming.search;
  const response = await fetch(backend, { cache: "no-store", redirect: "follow" });
  return new Response(await response.text(), {
    status: response.status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
