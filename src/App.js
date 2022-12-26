import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ListOfDogs from './Components/ListOfDogs';
import DogDetail from './Components/DogDetail';
import NewDog from './Components/NewDog';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="app">
      <Router>
      <Navbar />
        <div className="content"> 
          <Routes>
                <Route path="/" element={ <Home />} />
                <Route path="/dogs" element={ <ListOfDogs />}/>
                <Route path="/dog-detail/:dogId" element={ <DogDetail />} />
                <Route path="/newDog" element={ <NewDog />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;