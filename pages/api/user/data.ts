// api/user/data.ts
async function fetchAndStoreUserData(email: string): Promise<void> {
  const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
  const backendUrl = process.env.NEXT_PUBLIC_BACK_URL;
  const targetUrl = `${backendUrl}/v2/user/${encodeURIComponent(email)}`;

  try {
    const response = await fetch(PROXY_URL + targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }

    const userData = await response.json();

    localStorage.setItem('userId', userData.id); 
    localStorage.setItem('userEmail', userData.email); 
      
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}

export { fetchAndStoreUserData };
