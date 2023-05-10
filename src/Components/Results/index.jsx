import React from 'react';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css';

import './Results.scss';

function Results (props) {
  return (
    <section>
      <pre>
        {props.data ? 
        // JSON.stringify(props.data, undefined, 2)
        <JSONPretty data={props.data} theme={JSONPrettyMon} /> 
        : 
        'Loading...'}
      </pre>
    </section>
  );
}

export default Results;