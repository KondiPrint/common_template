export default async function fetcher(endpoint, { token, body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, config);
    if (response?.ok) {
      return await response.json();
    }
    throw new Error('Server returned ' + response.status);
  } catch (error) {
    console.error('There was a problem with the Fetch operation,', error);
    return null;
  }
}
