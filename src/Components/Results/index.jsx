import React from 'react';

import './Results.scss';

function Results (props) {
  return (
    <section>
      <pre>
        {props.data ? JSON.stringify(props.data, undefined, 2) : 'Loading...'}
      </pre>
    </section>
  );
}

export default Results;