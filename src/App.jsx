import './App.css';
import Main from './components/Main';
import SideBar from './components/SideBar';

function App() {


  return (
    <section className='App bg-[#f7faff] min-h-screen'>
      <section className='flex'>
        <SideBar />
        <Main />
      </section>
    </section>
  );
}

export default App;
