import Form from "./index";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing Form component...', () => {

  const callApi = jest.fn();

  test('Form and submit button should be visible', () => {

    render(<Form handleApiCall={callApi} />);

    let buttonEl = screen.getByTestId('form-submit-button');
    expect(buttonEl).toBeVisible();

    let formEl = screen.getByTestId('api-form');
    expect(formEl).toBeVisible();

  })

  test("Form should trigger api call when 'GO!' button is clicked", () => {
    render(<Form handleApiCall={callApi} />);

    let buttonEl = screen.getByTestId('form-submit-button');

    fireEvent.click(buttonEl);
    expect(callApi).toHaveBeenCalled();

  })

  test("Form should trigger api call when submit event is triggered", () => {
    render(<Form handleApiCall={callApi} />);

    let formEl = screen.getByTestId('api-form');

    fireEvent.submit(formEl);
    expect(callApi).toHaveBeenCalled();

  })

})