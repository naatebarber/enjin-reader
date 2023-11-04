import { HashRouter, Routes, Route } from 'react-router-dom'

import Forums from './views/Forums'
import API from './api'
import "./style.css"
import Threads from './views/Threads'
import Posts from './views/Posts'

const App = () => {
  const api = new API("http://localhost:8080");

  return (
    <main>
      <HashRouter>
        <Routes>
          {/* <Route path="/" element={<Splash />} /> */}
          <Route path="/" element={<Forums api={api}/>} />
          <Route path="/threads" element={<Threads api={api} />} />
          <Route path="/posts" element={<Posts api={api} />} />
        </Routes>
      </HashRouter>
      
    </main>
  )
}

export default App
