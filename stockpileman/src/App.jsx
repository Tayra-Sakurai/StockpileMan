import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Copyright from './Components/Copyright.jsx';
import MenuComponent from './Components/MenuComponent.jsx';
import ItemEdit from './Components/ItemEdit.jsx';

function App() {
  return (
    <BrowserRouter>
      <header>
        <MenuComponent />
      </header>
      <main>
        <Routes>
          <Route path="/Edit/:id" element={<ItemEdit />} />
        </Routes>
      </main>
      <footer>
        <Copyright />
      </footer>
    </BrowserRouter>
  )
}

export default App
