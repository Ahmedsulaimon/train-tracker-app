import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react'; // Import React
import SearchBar from '../../Searchbar'; // Import the component

// Mock props for the SearchBar component
const mockProps = {
    data: {
        Tiplocs: [
            { Tiploc: 'T1', Name: 'Location 1', Latitude: 1, Longitude: 1, DisplayName: 'Location 1' },
            { Tiploc: 'T2', Name: 'Location 2', Latitude: 2, Longitude: 2, DisplayName: 'Location 2' },
        ],
    },
    moveToLocation: null,
    openSideBars: null,
    resetSelectedJourneyIndex: null,
    resetData: null,
};

describe('SearchBar', () => {
    it('renders input element', () => {
        render(<SearchBar {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(/Search by location or TIPLOC.../i);
        expect(inputElement).toBeInTheDocument();
    });

    it('filters results when typing into input', async () => {
        render(<SearchBar {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(/Search by location or TIPLOC.../i);
        fireEvent.change(inputElement, { target: { value: 'Location 1' } });

        // Wait for debounce to execute
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if the filtered result is displayed
        expect(screen.getByText('Location 1')).toBeInTheDocument();
        expect(screen.queryByText('Location 2')).not.toBeInTheDocument();
    });


});
