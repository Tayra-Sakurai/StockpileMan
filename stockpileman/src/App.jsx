import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Copyright from './Components/Copyright.jsx';
import MenuComponent from './Components/MenuComponent.jsx';
import ItemEdit from './Components/ItemEdit.jsx';
import { Container } from 'react-bootstrap';
import ItemAdd from './Components/ItemAdd.jsx';
import ItemView from './Components/Views/ItemView.jsx';
import liff from '@line/liff';

function App() {
  liff.init({
    liffId: import.meta.env.VITE_LIFF_ID,
  });

  return (
    <BrowserRouter>
      <header className="sticky-top">
        <MenuComponent />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<ItemView />} />
            <Route path="/Add" element={<ItemAdd />} />
            <Route path="/Edit/:id" element={<ItemEdit />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <Copyright />
      </footer>
    </BrowserRouter>
  )
}

export default App
