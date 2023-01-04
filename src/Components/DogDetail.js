import { useParams, useNavigate } from 'react-router-dom';
import DogManager from '../services/api/DogManager';
import { useEffect, useState } from 'react';

const DogDetail = () => {
    const navigate = useNavigate();
    const { dogId } = useParams();

    const [dog, setDog] = useState();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const getDogAsync = async () => {
            setIsLoading(true);
            const { isLoading, error, data } = await DogManager.getDog(dogId);
            setDog(data);
            setIsLoading(isLoading);
            setError(error);
        }
        getDogAsync();
    }, [dogId]);

    const handleOnDeleteClick = async () => {
        setIsLoading(true);
        const { isLoading, error, okStatus } = await DogManager.deleteDog(dogId);
        setIsLoading(isLoading);
        if (okStatus === true) navigate('/dogs');
        else setError(error);
    }

    const handleOnEditClick = () => {
        navigate('/editDog', { state: { dog: dog }})
    }

    return(
        <div className='dogDetail'>
            <h2>Szczegóły psa:</h2>
            { dog && 
            <ul>
                <li>Imie: {dog.name}</li>
                <li>Rasa: {dog.breed}</li>
                <li>Pies odrobaczony: {dog.isDewormedFirstTime ? 'Tak' : 'Nie'}</li>
                {dog.isDewormedFirstTime && <li>Data odrobaczenia: {dog.dateOfFirstDeworming}</li>}
                <li>Data pierwszej szczepionki: {dog.dateOfFirstVaccination}</li>
            </ul>
            }
            { isLoading && <div>Wczytywanie...</div> }
            {error && <div className='error'>{error}</div> }
            <div className='buttons'>
                <button onClick={handleOnEditClick}>Edytuj</button>
                <button onClick={handleOnDeleteClick}>Usuń</button>
            </div>
        </div>
    );
}

export default DogDetail;