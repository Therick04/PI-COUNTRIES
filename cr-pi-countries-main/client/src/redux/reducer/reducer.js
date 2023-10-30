import { CRDS_CNTRYS,DETAIL,FILTER,ORDER } from '../actions/types'

const initialState = {
    CRDS:[],
    CRDS_FILT:[],
    DETAIL_CRD:[]
}

const rootReducer = (state = initialState,{type,payload} = action) => {
    switch(type){
        case CRDS_CNTRYS:

            return { ...state,CRDS: payload,CRDS_FILT: payload}

        case DETAIL:
            return {...state,DETAIL_CRD: payload}

        case ORDER: 

            if(payload === 'default'){
                return {...state,CRDS: state.CRDS_FILT}
            }

            if(payload === 'A - Z'){
                const newOrder = [...state.CRDS].sort((a,b) => a.name.localeCompare(b.name))
                return {...state,CRDS: newOrder}
            }

            if(payload === "Z - A"){
                const newOrder = [...state.CRDS].sort((a,b) => b.name.localeCompare(a.name))
                return {...state,CRDS: newOrder}
            }

            if(payload === "+"){
                const newOrder = [...state.CRDS].sort((a,b) => b.population - a.population)
                return {...state,CRDS: newOrder}
            }

            if(payload === "-"){
                const newOrder = [...state.CRDS].sort((a,b) => a.population - b.population)
                return {...state,CRDS: newOrder}
            }

        case FILTER:
            if(payload === 'all'){
                return {...state,CRDS: state.CRDS_FILT}
            }

            const contXCountry = state.CRDS_FILT.filter((cntry) => cntry.continents.includes(payload) )
            return {...state,CRDS: contXCountry}

        default:
            return {...state}
    }
}

export default rootReducer