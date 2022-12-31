import React from "react";
import apiService from "./apiService";

class DogManager extends React.Component {
    static deleteDog = async (dogId) => {
        const url = `https://localhost:7253/api/Dog/${dogId}`;

        const { isLoading, error, okStatus } = await apiService(url, 'DELETE');

        return { isLoading, error, okStatus };
    }

    static getDog = async (dogId) => {
        const url = `https://localhost:7253/api/Dog/${dogId}`;
        
        const { isLoading, error, data } = await apiService(url);
        
        return { isLoading, error, data };
    }

    static addDog = async (dog) => {
        const url = 'https://localhost:7253/api/Dog';
        
        const { isLoading, error, okStatus } = await apiService(url, 'POST', dog);

        return { isLoading, error, okStatus };
    }

    editDog = () => {
//const url = 'http://httpstat.us/200';
    }
}

export default DogManager;