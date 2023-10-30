import { useState } from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage'
import Detail from './components/DetailPage/DetailPage';
import Header from './components/HomePage/Header'
import Form from './components/FormPage/Form'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { AGG_COUNTRIES,AGG_DETAIL,POST_ACTIVITY } from './redux/actions/actions'


function App() {
  const dispatch = useDispatch()
  const URLDB = `http://localhost:3001`

  const [count, setCount] = useState(0)

  const navigate = useNavigate();
  

  const login = () => {
    navigate('/home')
  }

  const [dataForm,setDataForm] = useState('')
  const [compList,setCompList] = useState([])

  dispatch(AGG_COUNTRIES())

  const onSearch = (name,bool) => {
    axios
      .get(`${URLDB}/countries/search/?name=${name}`)
      .then((response) => {
        setCompList(response.data.CountryXName)
      })
      .catch((error) => {
        console.log(error)
      });
  };
  
  const detailCountry = (id) => {
    navigate(`/detail/${id}`)
    dispatch(AGG_DETAIL(id))
  };

  const agregarActity = (data) => {
    dispatch(POST_ACTIVITY(data))
  }

  let nav = location.pathname === '/home'

  return (

    <>

    {nav && (<Header onSearch={onSearch} compList={compList} detailCountry={detailCountry}/>)}

    <Routes>
      <Route path='/' element={<LandingPage login={login}/>}/>
      <Route path='/home' element={<HomePage detailCountry={detailCountry} />}/>
      <Route path='/detail/:id' element={<Detail detailCountry={detailCountry}/> }/>
      <Route path='/form' element={<Form agregarActity={agregarActity}/>}/>
    </Routes>
    </>

  )
}

export default App