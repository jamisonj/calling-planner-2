import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import './App.css';
import './components/NamesList';
import NamesList from './components/NamesList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <NamesList/>
    </section>
  );
}

export default App;
