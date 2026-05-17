import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Copyright from './Components/Copyright';
import MenuComponent from './Components/MenuComponent';
import ItemEdit from './Components/ItemEdit';

function App() {
  return (
    <BrowserRouter>
      <header>
        <MenuComponent />
      </header>
      <Routes>
        <Route path="/" element={<ItemEdit />} />
        <Route path="/copy" element={<Copyright />} />
      </Routes>
      <footer>
        <Copyright />
      </footer>
    </BrowserRouter>
  )
}

export default App
