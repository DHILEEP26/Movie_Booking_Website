import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/HomePage';
import AddPage from './pages/AddPage';
import View from './pages/ViewPage';
import MovieNames from './pages/MoviesAvailable';


function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <ToastContainer position="top-center"/>
      <Routes>
        <Route exact path='/' Component={MovieNames}/>
        <Route path="/home" Component={Home}/>
        <Route path="/addContact" Component={AddPage}/>
        <Route path="/update/:id" Component={AddPage}/>
        <Route path="/view/:id" Component={View}/>
      </Routes>  
    </div>
    </BrowserRouter>
  );
}

export default App;
