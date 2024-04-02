import './App.css'
import Tables from './Components/Tables'
import RandomGenerator from './Components/RandomGenerator'

function App() {

  return (
    <div>
      <header className="site-header">
  <div className="site-identity">
    <h1>
      <a href="#"><img src='/img/logo_dark.png' alt='Mechsoft'></img></a>
    </h1>
  </div>
  <nav className="site-navigation">
    <ul className="nav" style={{marginTop:'3%'}} >
      <li >
        <a href="#">About</a>
      </li>
      <li>
        <a href="#">Contact</a>
      </li>
    </ul>
  </nav>
</header>
      <Tables/>
      <RandomGenerator/>
      <footer style={{position:'relative',bottom:'0',borderTop:' 0.1px grey',width:'100%',height:'10%'}}>
 <h4 style={{textAlign:'center',marginTop:'2%'}}>Created by Orhun Cem Gença &copy;</h4>
</footer>

    </div>
  )
}

export default App
