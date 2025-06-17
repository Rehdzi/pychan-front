import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout'
import MainPage from './pages/MainPage'
import BoardPage from './pages/BoardPage';
import ThreadPage from './pages/ThreadPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage/>}/>
          <Route path=':tag' element={<BoardPage/>}/>
          <Route path=':tag/thread/:id' element={<ThreadPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
