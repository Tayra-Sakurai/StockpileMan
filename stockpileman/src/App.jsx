import Button from 'react-bootstrap/Button';
import './App.css';
import MenuComponent from './Components/MenuComponent';
import { useState } from 'react';

function App() {
  const { counter, setCounter } = useState(0);

  return (
    <>
      <MenuComponent />
      <p>ようこそ</p>
      <Button type="button" onClick={() => setCounter(counter + 1)}>Count {counter}</Button>
    </>
  )
}

export default App
