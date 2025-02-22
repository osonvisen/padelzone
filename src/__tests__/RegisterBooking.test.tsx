const { render, fireEvent } = require("@testing-library/react");
const { Provider } = require("react-redux");
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
    });

    test("Brukeren kan velge en bane", () => {
        render(
            <Provider store={store}>
                <RegisterBooking />
            </Provider>
        );

        const courtSelect = screen.getByLabelText(/Bane/i);
        fireEvent.change(courtSelect, { target: { value: "3" } });

        expect((courtSelect as HTMLSelectElement).value.toBe("3"));
    });
});
