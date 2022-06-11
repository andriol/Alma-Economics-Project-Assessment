import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

const App = () => {
  const [time, setTime] = useState('');
  const [area, setArea] = useState('');
  const [region, setRegion] = useState('');
  const [result, setResult] = useState('');
  const url = `https://api.beta.ons.gov.uk/v1/datasets/wellbeing-local-authority/editions/time-series/versions/2/observations?time=${time}&geography=${area}&estimate=average-mean&measureofwellbeing=happiness`;
  const handleSelect = (e) => {
    setTime(e);
  };
  const regionSelect = (e) => {
    setArea(e);
  };
  const setRegionVar = (e) => {
    setRegion(e.target.innerHTML);
  };

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const res = data.observations[0].observation;

    setResult(res);
  };
  return (
    <div className='App'>
      <div className='header-title'>United Kingdom Well-Being Rate Survey</div>
      <p className='header-paragraph'>
        The UK Office for National Statistics (ONS) publishes an annual dataset
        on estimates of life satisfaction at the UK, country, region and local
        authority level. To collect this data, which is part of the Annual
        Population Survey (APS), the ONS asks people in the UK to rate their
        well-being on an 11-point scale. There are 4 different measures of
        well-being that are part of the survey: anxiety, happiness, life
        satisfaction and worthwhile. The most recent version of the dataset can
        be accessed on the ONS website or via the ONS API.
      </p>
      <div className='dropdown__container-btns'>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Time Period
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey={'2016-17'}>2016-17</Dropdown.Item>
            <Dropdown.Item eventKey={'2017-18'}>2017-18</Dropdown.Item>
            <Dropdown.Item eventKey={'2018-19'}>2018-19</Dropdown.Item>
            <Dropdown.Item eventKey={'2019-20'}>2019-20</Dropdown.Item>
            <Dropdown.Item eventKey={'2020-21'}>2020-21</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown onSelect={regionSelect}>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Region
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey={'E12000001'} onClick={setRegionVar}>
              North East
            </Dropdown.Item>
            <Dropdown.Item eventKey={'E12000002'} onClick={setRegionVar}>
              North West
            </Dropdown.Item>
            <Dropdown.Item eventKey={'E12000003'} onClick={setRegionVar}>
              Yorkshire and The Humber
            </Dropdown.Item>
            <Dropdown.Item eventKey={'E12000004'} onClick={setRegionVar}>
              East Midlands
            </Dropdown.Item>
            <Dropdown.Item eventKey={'E12000005'} onClick={setRegionVar}>
              West Mitlands
            </Dropdown.Item>
            <Dropdown.Item eventKey={'E12000006'} onClick={setRegionVar}>
              East of England
            </Dropdown.Item>
            <Dropdown.Item eventKey={'E12000007'} onClick={setRegionVar}>
              London
            </Dropdown.Item>
            <Dropdown.Item eventKey={'E12000008'} onClick={setRegionVar}>
              South East
            </Dropdown.Item>
            <Dropdown.Item eventKey={'E12000009'} onClick={setRegionVar}>
              South West
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <button type='button' className='btn btn-primary' onClick={getData}>
        Get Results
      </button>

      <div className='main__body'>
        {result !== ''
          ? `The result for ${time} in ${region} is ${result}`
          : ''}
      </div>
    </div>
  );
};

export default App;
