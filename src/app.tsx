import { useEffect } from 'react';
import { initCloud } from './services/cloud';
import './app.css';

function App(props) {
  useEffect(() => {
    initCloud();
  }, []);

  return props?.children || null;
}

export default App;
