import { useState, useEffect } from 'react';

const useFetch = (url) => {

    const [data, setData ] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(url, { signal: abortController.signal }).then(response => {
            if(!response.ok) {
                throw Error("Could not fetch data");
            }
            return response.json();
        }).then(data => {
            setData(data);
            setIsLoading(false);
            setError(false);
        }).catch(error => {
            if (signal.aborted) {
                console.log("Fetch was aborted");
                setIsLoading(false);
            }
            else {
                setError(error.message);
                setIsLoading(false);
            }
        })

        return () => abortController.abort();
    }, [url])

    return { data, isLoading, error }
}

export default useFetch;