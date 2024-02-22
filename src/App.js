import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import BlockCipher from './Pages/BlockCipher';
import BlockChainAndRNG from './Pages/BlockChainAndRNG';
import Duck from './Duck';
//import duck from './images/quack.png';

function App() {
  return (
    <BrowserRouter>
    
      <div className="App"> 
        <header>
          <nav>
            <NavLink to ="idkLol"> uhhhhh</NavLink>
            <NavLink to="blockCipher">Block Cipher</NavLink>
            <NavLink to="otherBlock"> Other Block</NavLink>
            <NavLink to="/">Home</NavLink>
            
            <h1>THIS IS A NAV BAR</h1>
          </nav>
        </header>
        
        <main>
        
        <div classname="content">
          <h1>Hello World</h1>
        
          
          
          <Routes>
            <Route path="/"/>
            <Route path="/idkLol" element={<Duck/>}/>
            <Route path="blockCipher" element={<BlockCipher/>} />
            <Route path="otherBlock" element={<BlockChainAndRNG/>} />

          </Routes> 
          
        </div>
        </main> 
      </div>
    </BrowserRouter> 
  );
}





/* <header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
</header> */
export default App;
