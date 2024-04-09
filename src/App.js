import './App.css';
import Header from './Layout/Header';
import { BrowserRouter } from 'react-router-dom';
import Socket from './Socket';
import CustomRoutes from './routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Socket />
      <Header />
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
