import { Route, Routes } from 'react-router-dom';
import classes from  './App.module.css';
import Game from './Components/DashboardGame/Game';
import Home from './Components/HomeView/Home';
import NavBar from './Components/NavBar/NavBar';

const App=() =>{


  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/game/:name/:room" element={<Game />}></Route>
      </Routes>
    </div>
  );
}

export default App;
