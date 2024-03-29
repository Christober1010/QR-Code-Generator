import { Toaster } from 'react-hot-toast';
import './App.css';
import QRcode from './Components/QRcode';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      
      <QRcode></QRcode>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
