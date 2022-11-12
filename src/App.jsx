import './App.css';
import { useData } from "./contexts/DataContext";

function App() {
  const data = useData();
  const re = /(a-zA-Z])/g;

  return (
    <div className="App">
      <h1>Fourrière</h1>
      <div>
        <p>
          Votre véhicule est il en fourrière ?
        </p>
      </div>
      <p className="read-the-docs">
        Regardez donc dans la liste ci-dessous : 
      </p>
          <ul className="flex">
            {Object.values(data).map((item) => (
                <li className='card' key={item.id}>
                  <img src={item.picture} alt={item.immat} />
                  <h3 className='title-card'>{item.immat}</h3>
                </li>
            ))}
          </ul>
    </div>
  )
};

export default App;
