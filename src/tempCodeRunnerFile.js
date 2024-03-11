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