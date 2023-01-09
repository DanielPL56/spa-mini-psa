import apiService from './apiService';
import apiServiceWithFiles from './apiServiceWithFiles';

class DogManager {
    static url = 'https://localhost:7253/api/Dog';

    static deleteDog = async (dogId) => {
        const url = this.url + `/${dogId}`;
        //const url = this.url + `/DeleteDogWithImage/${dogId}`;

        const { isLoading, error, okStatus } = await apiService(url, 'DELETE');

        return { isLoading, error, okStatus };
    }

    static getDog = async (dogId) => {
        const url = this.url + `/${dogId}`;
        
        const { isLoading, error, data } = await apiService(url);
        
        return { isLoading, error, data };
    }

    static addDog = async (dog) => {
        const { isLoading, error, okStatus } = await apiService(this.url, 'POST', dog);

        return { isLoading, error, okStatus };
    }

    static updateDog = async (dog) => {
        //const url = 'http://httpstat.us/400';
        const url = this.url + `/${dog.id}`;

        const { isLoading, error, okStatus } = await apiService(url, 'PUT', dog);

        return { isLoading, error, okStatus };
    }

    static addDogWithImage = async (formData) => {
        const url = 'https://localhost:7253/api/Dog/AddDogWithImage'

        const { isLoading, error, okStatus } = await apiServiceWithFiles(url, 'POST', formData);

        return { isLoading, error, okStatus };
    }
}

export default DogManager;