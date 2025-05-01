import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout'
import MainPage from './pages/MainPage'
import BoardPage from './pages/BoardPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage/>}/>
          <Route path=':tag' element={<BoardPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
