import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { CarPost } from './Views/CarPost'
import Home from './Views/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/car" element={<CarPost />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
