// api/organizations/post.ts
async function createOrganization(name: string) {
    const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
    const backendUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      throw new Error('No user ID found in localStorage.');
    }
  
    const targetUrl = `${backendUrl}/v2/organization/create`;
    const proxyTargetUrl = PROXY_URL + targetUrl;
  
    const organizationData = {
      owner: userId,
      name: name
    };
  
    try {
      const response = await fetch(proxyTargetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organizationData)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Creating organization failed:", error);
    }
  }
  
  export { createOrganization };
  