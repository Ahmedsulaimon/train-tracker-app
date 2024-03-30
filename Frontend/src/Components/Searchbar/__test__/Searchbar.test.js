import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../Searchbar';

describe("SearchLocation", () => {
    it('should render input element', () => {
        render(
            <SearchBar

                data={[]}
                moveToLocation={() => { }}
                openSideBars={() => { }}
                resetSelectedJourneyIndex={() => { }}
                resetData={() => { }}
            />
        );
        const inputElement = screen.getByPlaceholderText(/Search by location or TIPLOC.../i);
        expect(inputElement).toBeInTheDocument();
    });
}

)