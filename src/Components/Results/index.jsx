import React from 'react';
import JSONPretty from 'react-json-pretty';
import myTheme from '../../Style/myJsonTheme';
import Loading from '../Loading';

import './Results.scss';

function Results (props) {
  return (
    <section data-testid={'results'} style={{height: '75vh'}}>
      {
      props.isLoading ? 
      <Loading />
      : 
      <JSONPretty data={props.data} theme={myTheme} /> 
      }
    </section>
  );
}

export default Results;