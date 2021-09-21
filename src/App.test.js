import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
    test('render App component', async () => {
        render(<App />);
        await screen.findByText(/Logged in as/i);
        expect(screen.queryByText(/Searches for React/i)).toBeNull();
        // fireEvent.change(screen.getByRole('textbox'), {
        //     target: { value: 'React' },
        // });
        userEvent.type(screen.getByRole('textbox'), 'React');
        expect(screen.queryByText(/Searches for React/i)).toBeInTheDocument();
    });
});

describe('events', () => {
    it('checkbox click', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <input type="checkbox" onChange={handleChange} />
        );
        const checkbox = container.firstChild;
        expect(checkbox).not.toBeChecked();
        // fireEvent.click(checkbox);
        userEvent.click(checkbox);
        // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
        expect(handleChange).toBeCalledTimes(1);
        expect(checkbox).toBeChecked();
    });

    it('double click', () => {
        const handleChange = jest.fn();
        const { container } = render(
            <input type="checkbox" onChange={handleChange} />
        );
        const checkbox = container.firstChild;
        expect(checkbox).not.toBeChecked();
        userEvent.dblClick(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it('focus', () => {
        const { getAllByTestId } = render(
            <div>
                <input data-testid="element" type="checkbox" />
                <input data-testid="element" type="radio" />
                <input data-testid="element" type="number" />
            </div>
        );
        const [checkbox, radio, number] = getAllByTestId('element');
        userEvent.tab();
        expect(checkbox).toHaveFocus();
        userEvent.tab();
        expect(radio).toHaveFocus();
        userEvent.tab();
        expect(number).toHaveFocus();
    });

    it('select option', () => {
        const { selectoptions, getByRole, getByText } = render(
            <select name="select" id="select">
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
            </select>
        );

        userEvent.selectOptions(getByRole('combobox'), '1');
        expect(getByText('A').selected).toBeTruthy();

        userEvent.selectOptions(getByRole('combobox'), '2');
        expect(getByText('B').selected).toBeTruthy();

        userEvent.selectOptions(getByRole('combobox'), '3');
        expect(getByText('C').selected).toBeTruthy();
        expect(getByText('A').selected).toBeFalsy();
    });
});
