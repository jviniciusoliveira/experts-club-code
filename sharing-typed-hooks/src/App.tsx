import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Playlist } from './pages/Playlist';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Header />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
