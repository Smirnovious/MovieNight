import './App.css';
import {Header} from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Watchlist } from './components/Watchlist';
import { Watched } from './components/Watched';
import { Add } from './components/Add';
import { Random } from './components/Random';
import { GlobalProvider } from "./context/GlobalState";
import "./lib/font-awesome/css/all.min.css";

function App() {
  
  return (
  <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Watchlist/>} />
          <Route path="/watched" element={<Watched/>} />
          <Route path="/Add" element={<Add/>} />
          <Route path='/Random' element={<Random/>} />
        </Routes>
      </Router>
  </GlobalProvider>
);
}

export default App;