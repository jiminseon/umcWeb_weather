import axios from "axios";
import { useState } from "react";
import styled from 'styled-components';

function App() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`;
  

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url
        })
        setResult(data);
      }
      catch (err) {
        alert(err);
      }
    }
  }
  
  
  return (
    <AppWrap>
      <div className="App">
        <input 
          placeholder="도시를 입력하세요"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type='text'
          onKeyDown={searchWeather}
          />
          {Object.keys(result).length !== 0 && (
            <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="temperature">
              {Math.round(((result.data.main.temp -273.15) * 10)) / 10}ºC 
              </div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
          )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  border 1px red solid;

  .app {
    left: 50%;
  }
`;

const ResultWrap = styled.div`
  margin-tip: 60px;
`;