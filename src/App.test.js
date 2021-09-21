import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render App component', () => {
        render(<App />);
        expect(screen.queryByText(/Searches for React:/i)).toBeNull();
    });

    it('should render async h2', async () => {
        render(<App />);
        expect(screen.queryByText(/Logged in as/i)).toBeNull();
        expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
    });

    it('image should have a class', () => {
        render(<App />);
        expect(screen.getByAltText(/search image/i)).toHaveClass('image');
    });

    it('form control should not be required', () => {
        render(<App />);
        expect(screen.getByLabelText(/Search:/i)).not.toBeRequired();
        expect(screen.getByLabelText(/Search:/i)).toBeEmptyDOMElement();
        expect(screen.getByLabelText(/Search:/i)).toHaveAttribute('id');
    });
});
