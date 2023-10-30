import axios from "axios";
import React, { useState, useEffect } from "react";

const Form = ({agregarActity}) => {

    const URLDB = `http://localhost:3001`


    const [data, setData] = useState({
        n: "",
        difficulty: "null",
        hrs: "",
        min: "",
        temp: "null",
        country: "",
        countries: [],
        check: false
    });

    const [errors, setErrors] = useState({
        nom:"",
        durationERROR: "",
        countriesERROR: "",
        compE: false
    });

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setData({ ...data, [property]: value });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (data.country.trim() === "" || data.country.length === 0) {
                    return;
                }

                const response = await axios.get(`${URLDB}/countries/search/?name=${data.country}`)

                if(data.countries.includes(response.data.CountryXName[0].name)){
                    return console.log('yasta');
                }

                if (response.data.CountryXName.length > 1) {
                    return setErrors({ ...errors, countriesERROR: 'Este nombre coincide con más de un país.', compE: true })
                } else {
                    setErrors({ ...errors, compE: false })
                }
                setData({ ...data, countries: [...data.countries, response.data.CountryXName[0].name], country: '' })
                setErrors({ ...errors, countriesERROR: '' })
            } catch (error) {
            setErrors({ ...errors, countriesERROR: error.response.data.error })
            }
        }
        fetchData()
    }, [data.country])


    const delCountry = (country) => {
        const newCountries = data.countries.filter((cntry) => country !== cntry)
        setData({...data,countries: newCountries})
    }


    const sendInf = () => {
        let m = ''
        let h = ''

        if(data.min.length == 1){
            m = `0${data.min}`
        } else {
            m = data.min
        }

        if(data.hrs.length == 1){
            h = `0${data.hrs}`
        } else {
            h = data.hrs
        }

        if(data.n.length < 1){
            return setErrors({...errors,compE: true})
        } else {
            setErrors({...errors,compE: false})
        }


        if(data.min.length < 1 || data.hrs.length < 1){
            console.log('s');
            return setErrors({...errors,compE: true})
        } else{
            setErrors({...errors,compE: false})

            if(Number(data.min) > 60 || Number(data.min < 0) || Number(data.hrs) > 24 || Number(data.hrs) < 0){
                console.log('s');
                return setErrors({...errors,compE: true})
            }else{
                setErrors({...errors,compE: false})
            }
        }

        if(data.difficulty === 'null'){
            console.log('ss');
            return setErrors({...errors,compE: true})
        }else{
            setErrors({...errors,compE: false})
        }

        if(data.temp === 'null'){
            console.log('ssss');
            return setErrors({...errors,compE: true})
        }else{
            setErrors({...errors,compE: false})
        }

        if(errors.compE === false){
            setErrors({
                nom:"",
                durationERROR: "",
                countriesERROR: "",
                compE: false
            })

            setData({
                n: "",
                difficulty: "null",
                hrs: "",
                min: "",
                temp: "null",
                country: "",
                countries: [],
                check: false
            })

            agregarActity({
                id: data.n.replace(/\s/g, ""),
                name: data.n,
                difficulty: data.difficulty,
                duration: `${h}:${m}`,
                temp: data.temp,
                countries: data.countries
            })
        }
    }

    return (
        <div>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="n"  value={data.n} onChange={handleChange}/>
                    <p>{data.n.length < 1 && <span>Se necesita un nombre.</span>}</p>
                </div>

                <div>
                    <label>Dificultad:</label>
                    <select value={data.difficulty} onChange={handleChange} name="difficulty">
                        <option value="null">// - //</option>
                        <option value="1"> Dificultad 1</option>
                        <option value="2"> Dificultad 2</option>
                        <option value="3"> Dificultad 3</option>
                        <option value="4"> Dificultad 4</option>
                        <option value="5"> Dificultad 5</option>
                    </select>
                </div>

                <div>
                    <h2>Duración</h2>

                    <label>Horas:</label>
                    <input type="number" name="hrs"  value={data.hrs} onChange={handleChange}/>

                    <label>Minutos:</label>
                    <input type="number" name="min"  value={data.min} onChange={handleChange}/>

                    <p>{data.hrs.length < 1 && data.min.length < 1 && <span>Se necesita una duracion.</span>}</p>
                    <p>{data.hrs.length < 1 && data.min.length > 1 && <span>Se necesita una hora</span>}</p>
                    <p>{data.hrs.length > 1 && data.min.length < 1 && <span>Se neceistan minutos</span>}</p>
                </div>

                <div>
                    <label>Temporada:</label>
                    <select value={data.temp} onChange={handleChange} name="temp">
                        <option value="null">// - //</option>
                        <option value="verano">Verano</option>
                        <option value="otoño">Otoño</option>
                        <option value="invierno">Invierno</option>
                        <option value="primavera">Primavera</option>
                    </select>
                </div>

                <div>
                    <label>Paises:</label>
                    <input type="text" name="country"  value={data.country} onChange={handleChange}/>
                    <p>{errors.countriesERROR}</p>


                    <div className="countriesXactivities">
                        {data.countries && data.countries.map((cntry) => {
                            return <div key={cntry}>
                                <h1>{cntry}</h1>
                                <button onClick={(event) => {
                                    event.preventDefault()
                                    delCountry(cntry)
                                }}>X</button>
                            </div>
                        })}
                    </div>

                </div>

                <div>
                    <button onClick={(event) => {
                        event.preventDefault()
                        sendInf()
                    }}>Agregar actividad!</button>
                    {errors.compE && <div>
                            <p>Alguno de los campos presentan erores</p>
                        </div>}

                </div>
            </form>
        </div>
    )
}

export default Form