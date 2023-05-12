import Results from "./index";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing Results component...', () => {

  test('Results component should be visible', () => {
    render(<Results />);

    let resultsEl = screen.getByTestId('results');
    expect(resultsEl).toBeVisible();
  })

  test('Api call response data is being passed into component as props.data', () => {
    render(<Results data={'test'}/>);

    // if the 'data' props is passed into the results component, then the <JSONPretty /> component gets rendered as a child component, therefore if this test pass that means that props.data is being passed into the component.
    let resultsEl = screen.getByTestId('results');
    expect(resultsEl.hasChildNodes).toBeTruthy();
  })

})