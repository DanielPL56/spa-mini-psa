import Dogs from "../Data/Dogs";
import { useState } from 'react';

const ListOfDogs = () => {

    const [ dogs, setDogs ] = useState(Dogs());

    return (
        <div>
            Hello from dogs:
            
            {dogs.map((dog) => (
               <div key={ dog.id }>
                { dog.name } is under { dog.age }
               </div> 
            ))}

        </div>
    );
}

export default ListOfDogs;