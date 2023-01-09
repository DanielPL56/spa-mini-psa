import { useEffect, useState } from 'react';
import useGetBreeds from '../hooks/api/useGetBreeds.hook';

const EditDogBreed = ({ dog }) => {

    const [newBreed, setNewBreed ] = useState(dog.breed);
    const [error, setError ] = useState(null);

    const { data: breeds, error: fetchError } = useGetBreeds();
    
    if (fetchError !== null) setError(fetchError);
    
    const handleOnChange = (value) => {
        if(value !== '-') {
            setNewBreed(value);
            dog.breed = value;
            setError(null);
        }
        else{setError('Wybierz rase')}
    }

    return (
        <span>
            <select type='text' placeholder='Rasa' value={newBreed} onChange={(e) => handleOnChange(e.target.value)}>
                {breeds && breeds.map((breed) => ( 
                    <option key={breed.id} value={breed.name}>{breed.name}</option>
                ))}
            </select>
            {error && <div className='error'>{error}</div>}
        </span>
    );
}

export default EditDogBreed;