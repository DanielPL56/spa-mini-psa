import { useState } from 'react';

const useFetch = (url, method = 'GET', body) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const abortController = new AbortController();

    const executeAsync = async () => {
        const signal = abortController.signal;
        let response;

        try {
            response = await fetch(url, {
                signal,
                method,
                body: JSON.stringify(body)
            });
        }
        catch (exception) {
            setError(exception.message);
            setIsLoading(false);
        }

        if (!response?.ok) {
            setError("Could not fetch data");
            setIsLoading(false);

            return;
        }
        else if (signal.aborted) {
            console.log('Fetch was aborted');
            setIsLoading(false);

            return;
        }
        
        const data = await response.json();
        setIsLoading(false);

        return data;
    };

    const abort = () => abortController.abort();

    return { isLoading, error, executeAsync, abort };
}

export default useFetch;