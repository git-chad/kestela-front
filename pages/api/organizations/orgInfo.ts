export async function fetchOrganizationInfo({ id }: { id: string }) {
  const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
  const backendUrl = process.env.NEXT_PUBLIC_BACK_URL;
  const orgId = id;

  if (orgId) {
    const targetUrl = `${backendUrl}/v2/organization/${orgId}`;
    const proxyTargetUrl = PROXY_URL + targetUrl;

    try {
      const response = await fetch(proxyTargetUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching organization info failed:', error);
      return [];
    }
  } else {
    return [];
  }
}
