import { useState, useEffect } from 'react';
import useFetch from './useFetch.hook';

const useGetDogs = () => {
    const url = 'https://localhost:7253/api/Dog';
    //const url = 'https://localhost:7253/api/Dog/GetAllDogsWithImage';
    const [data, setData] = useState();

    const { isLoading, error, executeAsync, abort } = useFetch(url);

    useEffect(() => {
        executeAsync().then(data => setData(data));
        return abort;
    }, []);

    return { data, isLoading, error };
}

export default useGetDogs;