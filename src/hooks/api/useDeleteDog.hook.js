import useFetch from "./useFetch.hook";

const useDeleteDog = (dog) => {
    const url = `https://localhost:7253/api/Dog${dog.id}`;
    const method = 'DELETE';

    const deleteAsync = async () => {
        executeAsync();
    }

    const { isLoading, error, executeAsync, abort } = useFetch(url, method, dog);

    return { isLoading, error, executeAsync, abort };
}

export default useDeleteDog;