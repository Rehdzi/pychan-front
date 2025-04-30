import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout'
import MainPage from './pages/MainPage'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
