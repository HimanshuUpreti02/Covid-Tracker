import './App.css';
import{
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
}from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './Components/InfoBox';
// import Map from './Components/Map';
import Table from './Components/Table';
import { sortData } from './util';

function App() {
  const [countries , setCountries] = useState([]);
  const [country , setCountry] = useState("worldwide");
  const [countryInfo , setCountryInfo] = useState({});
  const [tableData , setTableData] = useState([]);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data)=>{
      setCountryInfo(data)
    });
  },[])

  useEffect(()=>{
    const getCountriesData = async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name : country.country,
            value : country.countryInfo.iso2
          }));

        const sortedData = sortData(data);

        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData();
  },[])


  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      setCountry(countryCode);
      setCountryInfo(data);
    });
  };


  return (
    <div className = "app">
      <div className= "app__left">

        <div className = "app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange = {onCountryChange}
            >
                <MenuItem value = "worldwide">WorldWide</MenuItem>

              {countries.map((country ,index)=>{
                return(
                <MenuItem key={index} value = {country.value}>{country.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>

        <div className = "app__stats">
          <InfoBox title = "Covid Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title = "Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title = "Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        {/* <div className='app__map'>
          <Map/>
        </div> */}
      </div>

      <Card className='app__right' style={{"background-color" : "gray"}} >
        <CardContent>
          <h3>live cases by country</h3>
          <Table countries = {tableData}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

