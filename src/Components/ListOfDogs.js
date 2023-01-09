import { Link } from 'react-router-dom';
import useGetDogs from '../hooks/api/useGetDogs.hook';

const ListOfDogs = () => {
    const { data: dogs, isLoading, error } = useGetDogs();

    return (
        <div className='dogList'>
            {dogs && dogs.map((dog) => (
               <div className='dogPreview' key={dog.id}>
                {/* <Link to={`/dogDetail/${ dog.id }`}><h2>{dog.name}</h2></Link> */}
                <Link to={`/dogDetail`} state={dog}><h2>{dog.name}</h2></Link>
                {dog.profileImage && <img className='profileImage' alt='Zdjecie profilowe' src={`data:image/jpg;base64, ${dog.profileImage}`}/>}
                <ul>
                    <li>Rasa: {dog.breed}</li>
                    <li>Data urodzenia: {dog.dateOfBirth.slice(0, 10)}</li>
                    <li>Pies odrobaczony: {dog.isDewormedFirstTime ? 'Tak' : 'Nie'}</li>
                    {dog.isDewormedFirstTime && <li>Data odrobaczenia: {dog.dateOfFirstDeworming}</li>}
                    <li>Data pierwszej szczepionki: {dog.dateOfFirstVaccination}</li>
                </ul>
               </div> 
            ))}
            {isLoading && <div>Wczytywanie</div> }
            {error && <div className='error'>{error}</div> }
        </div>
    );
}

export default ListOfDogs;