import Footer from "./index";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing the Footer...', () => {

  test('Footer can render with props passed into it', () => {
    render(<Footer author={'Kawika Miller'} />)

    let footerEl = screen.getByTestId('footer');
    expect(footerEl).toBeVisible();
    expect(footerEl.innerHTML).toBe(`© 2023 | Author: Kawika Miller`)
  })

})