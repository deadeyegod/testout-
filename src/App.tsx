
import 'primereact/resources/themes/lara-dark-purple/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import ItemTable from './components/ItemTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold">Item List</h1>
      </header>
      <main>
        <ItemTable />
      </main>
    </div>
  );
}

export default App;
