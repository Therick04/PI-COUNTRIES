import { CRDS_CNTRYS,DETAIL,AGG_ACTIVITIES,FILTER,ORDER } from './types'
import axios from 'axios'



const URL = `http://localhost:3001/countries`

export const AGG_COUNTRIES = () => {
    try{
        return async (dispatch) => {
            const { data } = await axios.get(URL)
            dispatch({type:CRDS_CNTRYS, payload:data})
        }
    }catch(error){
        console.log(error.message);
    }
}

export const AGG_DETAIL = (id) => {
    try{
        return async (dispatch) => {
            const { data } = await axios.get(`${URL}/${id}`)
            dispatch({type:DETAIL, payload: data})
        }
    }catch(error){
        console.log(error.message);
    }
}

export const POST_ACTIVITY = (data) => {
  try{
    return async (dispatch) => {
      axios.post(`${URL}/activities`,data)
      dispatch({type: AGG_ACTIVITIES, payload: data})
    }
  } catch(error){
    console.log(error.message);
  }
}

export const COUNTRY_FILTER = (cntnt) => {
  return {type: FILTER,payload: cntnt}
}

export const COUNTRY_ORDER = (order) => {
  return {type: ORDER, payload: order}
}

//axios
  //      .get(`${URL}/${id}`)
    //    .then((response) => {
      //      return (dispatch) => {
        //        dispatch({type: DETAIL, payload: response.data})
          //  }
        //})
        //.catch((error) => {
          //  console.log(error);
        //})