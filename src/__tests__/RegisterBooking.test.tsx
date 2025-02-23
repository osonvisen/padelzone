import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import RegisterBooking from "../components/RegisterBooking";
import store from "../redux/store";

describe("RegistrerBooking", () => {
    test("Rendrer formen med riktige valg", () => {
        render(
            <Provider store={store}>
                <RegisterBooking />
            </Provider>
        );

        // Expecting:
        expect(screen.getByText(/Velg bane/)).toBeInTheDocument();
        expect(screen.getByText(/2 spillere/i)).toBeInTheDocument();
        expect(screen.getByText(/Velg tidspunkt/i)).toBeInTheDocument();
    });

    test("Brukeren kan velge en bane", () => {
        render(
            <Provider store={store}>
                <RegisterBooking />
            </Provider>
        );

        const courtSelect = screen.getByLabelText(/Bane/i) as HTMLSelectElement;
        fireEvent.change(courtSelect, { target: { value: "3" } });

        expect(courtSelect).toHaveValue("3");
    });
});
