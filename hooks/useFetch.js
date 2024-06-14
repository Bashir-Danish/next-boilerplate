import { useState } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const httpRequest = async ({ method, headers, body }) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: method !== 'GET' ? JSON.stringify(body) : null,
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const result = await response.json();
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { data, error, loading, httpRequest };
  };
  