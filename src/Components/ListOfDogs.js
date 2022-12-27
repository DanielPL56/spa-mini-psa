import useFetch from "../Functions/useFetch";
import { Link } from 'react-router-dom';

const ListOfDogs = () => {

    const url = "https://localhost:7253/api/Dog"
    const { data: dogs, isLoading, error } = useFetch(url);

    return (
        <div className="dogList">
            { dogs && dogs.map((dog) => (
               <div className="dogPreview" key={ dog.id }>
                <Link to={ `/dog-detail/${ dog.id }` }><h2>{ dog.name }</h2></Link>
                <ul>
                    <li>Rasa: { dog.breed }</li>
                    <li>Data urodzenia: { dog.dateOfBirth.slice(0, 10) }</li>
                    <li>Data pierwszego odrobaczenia: { dog.dateOfFirstDeworming }</li>
                    <li>Data pierwszej szczepionki: { dog.dateOfFirstVaccination }</li>
                </ul>
               </div> 
            ))}
            { isLoading && <div>Wczytywanie</div> }
            { error && <div>{ error }</div> }

        </div>
    );
}

export default ListOfDogs;