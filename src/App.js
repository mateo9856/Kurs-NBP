import React, { useEffect, useState } from 'react';
import './App.css';
import CourseList from './CourseList';

function App() {
  //states
  const [datas, setDatas] = useState([]);
  const [selectedDate, setSelectedDate] = useState("015/A/NBP/2021");
  const [activeTable, setActiveTable] = useState([]);

  useEffect(() => {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A/last/50/?format=json')
    .then(response => response.json())
    .then((data) => {
      setDatas(Array.from(data.reverse()))
      setActiveTable(data[0])
      })
    .catch(err => console.error(err));
  }, [])
    

  function handleSubmit(e) {
    e.preventDefault();
    const filterValue = datas.filter(data => data.no === selectedDate);
    setActiveTable(filterValue[0]);
  }

  return (
    <div className="App">
      <h1>Kurs NBP</h1>
      <h3>Wybierz kurs z ostatnich 30 notowań</h3>
      <form onSubmit = {handleSubmit}>
        <select value = {selectedDate} onChange = {(e) => {
          setSelectedDate(e.target.value)
          setActiveTable([]);
        }}>
          {datas.map(data => (
            <option key={data.no} value = {data.no}>{data.effectiveDate}</option>
          ))}
        </select><br/>
        <input type = "submit" value = "Pokaż!" /> 
      </form>
      
      {activeTable.no === selectedDate
      ? <CourseList value = {activeTable.rates} />
      : ""}

    </div>
  );
}

export default App;
