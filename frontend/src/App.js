import React, {useState } from "react"
import "./App.css";
import UserInput from "./Components/UserInput";
import OutPut from "./Components/OutPut"
import Amplify, { API } from 'aws-amplify'
import awsmobile from './aws-exports'
import { getAll, getCurrent } from '../src/graphql/queries'

Amplify.configure(awsmobile)

function App() {

  const [weather, setWeather] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState("")
  


  async function QueryGetAll(zipcode) {
    setError("")
    setWeather("")
    setWeatherData("")
    console.log(zipcode, "all")
    if(zipcode.length > 4 && zipcode.length < 9){
      
 try {
        const Data = await API.graphql({query:getAll,variables: {zipcode}})
        const weatherData = Data.data.getAll
        setWeatherData(weatherData)
        console.log(weatherData)
      } catch (err) { console.log('error fetching Weather data', err) }
    }else{
setError("Enter a valid zipcode")
    }

  }

  async function QueryGetCurrent(zipcode) {
    console.log(zipcode, "curr")
    setError("")
    setWeather("")
    setWeatherData("")
    if(zipcode.length > 4 && zipcode.length < 9){
    try {
      const Data =  await API.graphql({query: getCurrent, variables: { zipcode}})
      const weatherData = Data.data.getCurrent
      setWeather(weatherData)
    console.log(weatherData)
    } catch (err) {
      console.log('error fetching Current weather:', err)
    }
    }else{
      setError("Enter a valid zipcode")
    }
  }
  return (
    <div className="App">
        <UserInput getAll={QueryGetAll} getCurrent={QueryGetCurrent} error={error}/>
        {error && <p>{error}</p>}
        <OutPut weather={weather} weatherData={weatherData}/>
    </div>
  );
}

export default App;
