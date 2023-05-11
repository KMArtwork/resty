import React from 'react';
import JSONPretty from 'react-json-pretty';
import myTheme from '../../Style/myJsonTheme';

import './Results.scss';

function Results (props) {
  return (
    <section data-testid={'results'}>
      {props.data ? 
      // JSON.stringify(props.data, undefined, 2)
      <JSONPretty data={props.data} theme={myTheme} /> 
      : 
      null}
    </section>
  );
}

export default Results;