export async function gapiScript() {
  const gapi = await import('gapi-script').then((pack) => pack.gapi);
  return gapi
}