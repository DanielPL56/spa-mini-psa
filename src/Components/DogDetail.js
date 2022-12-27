import { useParams, useNavigate } from 'react-router-dom';
import useFetch  from '../Functions/useFetch';

const DogDetail = () => {

    const navigate = useNavigate();
    const { dogId } = useParams();
    const url = `https://localhost:7253/api/Dog/${ dogId }`
    const { data: dog, isLoading, error } = useFetch(url);

    const handleDeleteClick = () => {
        fetch(url, { method: "DELETE" })
        .then(() => {
            navigate("/dogs");  
        })
    }

    const handleEditClick = () => {
        navigate("/editDog", { state: { dog: dog, url: url }})
    }

    return(
        <div className="dogDetail">
            Hello from dog detail
            { dog && <div>
            <p>Dog id: { dog.id }</p>
            <p>Dog breed: { dog.breed }</p>
            </div> }
            { isLoading && <div>Wczytywanie...</div> }
            { error && <div>{ error }</div> }
            <div className="dogDetailButton">
                <button onClick={ handleEditClick }>Edytuj</button>
                <button onClick={ handleDeleteClick }>Usuń</button>
                </div>
        </div>
    );
}

export default DogDetail;