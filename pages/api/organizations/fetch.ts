export async function fetchOrganizations() {
  const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
  const backendUrl = process.env.NEXT_PUBLIC_BACK_URL; 
  const userId = localStorage.getItem('userId');

  if (userId) {
    const targetUrl = `${backendUrl}/v2/user/${userId}/organizations`; 
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
      console.error("Fetching organizations failed:", error);
      return [];
    }
  } else {
    return [];
  }
}
