import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EditDogName from './EditDogName';
import EditDogBreed from './EditDogBreed';
import EditDogDate from './EditDogDate';
import DogManager from '../services/api/DogManager';
import EditDogIsDewormedFirstTime from './EditDogIsDewormedFirstTime';
import EditDogIsDewormedFirstTimeDate from './EditDogIsDewormedFirstTimeDate';

const EditDog = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const dog = location.state.dog;

    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [oldName, setOldName] = useState(dog.name)
    const [oldBreed, setOldBreed] = useState(dog.breed);
    const [oldDate, setOldDate] = useState(dog.dateOfBirth);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (dog.isDewormedFirstTimeDate === null) dog.dateOfFirstDeworming = '';

        const { isLoading, error, okStatus } = await DogManager.updateDog(dog);
        setIsLoading(isLoading);

        if (okStatus === true) navigate(`/dogDetail/${dog.id}`);
        else setError(error);
    }
        
    return (
        <div className='editDog'>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <ul>
                    <li>
                        <span>Imię: <b>{oldName}</b>{' ==> '}</span>
                        <EditDogName dog={dog} />
                    </li>
                    <li>
                        <span>Rasa: <b>{oldBreed}</b> {' ==> '} </span>
                        <EditDogBreed dog={dog} />    
                    </li>
                    <li>
                        <span>Data urodzenia: <b>{oldDate.slice(0, 10)}</b> {' ==> '} </span>
                        <EditDogDate dog={dog} />
                    </li>
                    <li><EditDogIsDewormedFirstTime dog={dog} /></li>
                </ul>
                <div className='save'><button>Zapisz</button></div>
                {isLoading && <div>Wczytywanie...</div>}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
}

export default EditDog;