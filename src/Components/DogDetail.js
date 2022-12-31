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
        navigate("/editDog", { state: { dog: dog }})
    }

    return(
        <div className="dogDetail">
            Hello from dog detail
            { dog && <div>
            <p>Dog id: { dog.id }</p>
            <p>Dog breed: { dog.breed }</p>
            </div> }
            { isLoading && <div>Wczytywanie...</div> }
            { error && <div className="error">{ error }</div> }
            <div className="buttons">
                <button onClick={ handleOnEditClick }>Edytuj</button>
                <button onClick={ handleOnDeleteClick }>Usuń</button>
            </div>
        </div>
    );
}

export default DogDetail;