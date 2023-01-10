import { useNavigate, useLocation } from 'react-router-dom';
import DogManager from '../services/api/DogManager';
import { useEffect, useState } from 'react';
import { getImgSource } from '../services/functions/getImgSource';

const DogDetail = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const [dog, setDog] = useState(location.state);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [imagesToDisplay, setImagesToDisplay] = useState([]);

    useEffect(() => {
        dog.images.forEach(img => setImagesToDisplay(prev => [...prev, {id: img.id, file: getImgSource(img.file)}]));
    }, [dog])

    const handleOnDeleteClick = async () => {
        setIsLoading(true);
        const { isLoading, error, okStatus } = await DogManager.deleteDog(dog.id);
        setIsLoading(isLoading);
        if (okStatus === true) navigate('/dogs');
        else setError(error);
    }

    const handleOnEditClick = () => {
        navigate('/editDog', { state: { dog: dog }})
    }

    return(
        <>
        <div className='dogDetail'>
            <img className='profileImage' src={getImgSource(dog.profileImage)} alt='Zdjęcie profilowe' />
            { dog && 
            <ul>
                <li>Imie: {dog.name}</li>
                <li>Rasa: {dog.breed}</li>
                <li>Pies odrobaczony: {dog.isDewormedFirstTime ? 'Tak' : 'Nie'}</li>
                {dog.isDewormedFirstTime && <li>Data odrobaczenia: {dog.dateOfFirstDeworming}</li>}
                <li>Data pierwszej szczepionki: {dog.dateOfFirstVaccination}</li>
            </ul>
            }
            
            <div className='buttons'>
                <button onClick={handleOnEditClick}>Edytuj</button>
                <button onClick={handleOnDeleteClick}>Usuń</button>
            </div>
            {isLoading && <div>Wczytywanie...</div> }
            {error && <div className='error'>{error}</div> }
            
        </div>
        <div className='gallery'>
        {imagesToDisplay && imagesToDisplay.map((img) => (
            <img key={img.id} src={img.file} alt='gallery' />
        ))}
    </div>
    </>
    );
}

export default DogDetail;