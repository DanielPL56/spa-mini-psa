import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListOfDogs from './Components/ListOfDogs';

function App() {
  return (
    <div className="app">
      <Router>
      <Navbar />
        <div className="content"> 
          <Routes>
                <Route path="/" element={ <Home />} />
                <Route path="/dogs" element={ <ListOfDogs />}/>            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;