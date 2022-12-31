import { useEffect, useState } from "react";
import useFetch from "./useFetch.hook";

const useGetDog = (dogId) => {
    const url = `https://localhost:7253/api/Dog/${ dogId }`;
    const [data, setData] = useState();

    const { isLoading, error, executeAsync, abort } = useFetch(url);

    useEffect(() => {
        executeAsync().then(data => setData(data));
        return abort;
    }, []);

    return { data, isLoading, error };
}

export default useGetDog;