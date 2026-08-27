import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'
import AddCreator from './pages/AddCreator.jsx'
import { supabase } from './client'
import { useEffect, useState } from 'react';

function App() {
  const [allCreators, setAllCreators] = useState([])

  useEffect(() => {
    async function getAllCreators() {
      const { data, error } = await supabase.from('creators').select()
      if (error) {
        console.error(error)
        return
      }
      setAllCreators(data)
    }

    getAllCreators()
  }, [])

  

  console.log(allCreators)

  return (
    // <ul>
    //   {instruments.map((item) => (
    //     <li key={1}>{item.name}</li> 
    //   ))}
    // </ul>
    <BrowserRouter>
      <Routes>
        <Route index element={<ShowCreators allCreators={allCreators}/>} />
        <Route path="/view" element={<ViewCreator />} />
        <Route path="/edit" element={<EditCreator />} />
        <Route path="/add" element={<AddCreator />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
