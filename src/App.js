import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import logo from './images/wcs_logo_transparent_background2.png'
import Shawn from './Pages/Shawn-BlockCipher';
import Vanson from './Pages/Vanson';

import BlockChainAndRNG from './Pages/Web';

import Alex from './Pages/Alex'

import Duck from './Duck';

function App() {
  
  return (
    <BrowserRouter>
    
      <div className="App"> 
      <header className="App-header">
        <img src={logo} alt="Logo"  className="App-logo"/>
          <nav>
            <NavLink to ="idkLol"> uhhhhh</NavLink>

          

            <NavLink to="Shawn-blockCipher">Shawn Yuen</NavLink>
            <NavLink to="Vanson-cipher">Vanson</NavLink>

           
            <NavLink to="Web-block"> Web</NavLink>

            <NavLink to="Alex-cipher">Alex</NavLink>

            <NavLink to="/">Home</NavLink>

            
            
          </nav>
        </header>
        
        <main>
        
        <div className="content">
             
        
          
          
          <Routes>
            
          <Route path="/" element={<Home />} />

            <Route path="/idkLol" element={<Duck/>}/>
          
            <Route path="Web-block" element={<BlockChainAndRNG/>} />


            <Route path="Shawn-blockCipher" element={<Shawn/>} />
            <Route path="Vanson-cipher" element={<Vanson/>}/>

            <Route path="Alex-cipher" element= {<Alex/>}/>

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
