import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch  from '../Functions/useFetch';
import Dog from '../Model/Dog';

const DogDetail = () => {

    const navigate = useNavigate();
    const { dogId } = useParams();
    const url = `https://localhost:7253/api/Dog/${ dogId }`
    const { data: dog, isLoading, error } = useFetch(url);

    useEffect(() => {
        if(dog !== null) {
            const dogModel = new Dog(dog.name, dog.breed);
            console.log(dogModel);
        }
    }, [dog])

    const handleClick = () => {
        fetch(url, { method: "DELETE" })
        .then(() => {
            navigate("/dogs")
        })
    }

    return(
        <div className="dogDetail">
            Hello from dogdetail
            { dog && <div>
            <p>Dog id: { dog.id }</p>
            <p>Dog breed: { dog.breed }</p>
            </div> }
            { isLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            <button onClick={ handleClick }>Delete</button>
        </div>
    );
}

export default DogDetail;