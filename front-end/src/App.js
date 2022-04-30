import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Presentation/Pages/Home/Home';

import './App.css';

function App() {
  

  console.log(")")
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
