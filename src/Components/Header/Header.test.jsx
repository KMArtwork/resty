import Header from "./index";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing Header component...', () => {

  test('Header can render', () => {
    render(<Header />)

    let headerEl = screen.getByTestId('header');
    expect(headerEl).toBeVisible();
    expect(headerEl.firstChild.textContent).toBe('RESTy');
    
  })

})