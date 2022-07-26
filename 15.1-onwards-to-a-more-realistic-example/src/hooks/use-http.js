import { useState, useCallback } from 'react';


const useHttp = () => {
  // requests have the both status is loading and error -> so we need to add 2 state in here
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // not for specific url for task endpoint -> for any endpoint -> so we can pass the url as parameter into custom hook.
  
  const sendRequest = useCallback(async (requestConfigs, handleResponse) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfigs.url, {
          method: requestConfigs ? requestConfigs.method : 'GET',
          headers: requestConfigs ? requestConfigs.headers: {},
          body: requestConfigs ? JSON.stringify(requestConfigs.body) : null,
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      handleResponse(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useHttp;