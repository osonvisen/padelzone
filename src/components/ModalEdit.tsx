import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editBooking } from "../redux/bookingSlice";
import { editUser } from "../redux/userSlice";
import apiPUT from "../api/apiPUT";

interface EditProps {
    item: {
        _id: string;
        courtId?: string;
        date?: string;
        timeslot?: string;
        name?: string;
        email?: string;
        role?: "user" | "admin";
    };
    type: "bookings" | "users";
    onClose: () => void;
}

const ModalEdit: React.FC<EditProps> = ({ item, type, onClose }) => {
    const dispatch = useDispatch();
    const [updatedObject, setUpdatedObject] = useState(item);

    useEffect(() => {
        setUpdatedObject(item);
    }, [item]);

    const handleChange = (name: string, value: string) => {
        setUpdatedObject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const edited = await apiPUT(updatedObject, type);
            if (type === "bookings") {
                dispatch(editBooking(updatedObject));
            } else {
                dispatch(editUser(updatedObject));
            }
            alert(`${type === "bookings" ? "Booking" : "Bruker"} oppdatert!`);
            onClose();
        } catch (error) {
            console.error("Feil ved oppdatering av objekt!: ", error);
        }
    };

    return (
        <div className="modaledit">
            <h3>Rediger {type === "bookings" ? "booking" : "bruker"}</h3>

            {type === "bookings" ? (
                <>
                    <label>Bane:</label>
                    <select
                        value={updatedObject.courtId}
                        onChange={(e) =>
                            handleChange("courtId", e.target.value)
                        }
                    >
                        {[...Array(8)].map((_, i) => (
                            <option key={i} value={(i + 1).toString()}>
                                Bane {i + 1}
                            </option>
                        ))}
                    </select>

                    <label>Dato:</label>
                    <input
                        type="date"
                        value={updatedObject.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                    />

                    <label>Timeslot:</label>
                    <input
                        type="text"
                        value={updatedObject.timeslot}
                        onChange={(e) =>
                            handleChange("timeslot", e.target.value)
                        }
                    />
                </>
            ) : (
                <>
                    <label>Navn:</label>
                    <input
                        type="text"
                        value={updatedObject.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <label>E-post:</label>
                    <input
                        type="email"
                        value={updatedObject.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />

                    <label>Rolle:</label>
                    <select
                        value={updatedObject.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                    >
                        <option value="user">Bruker</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button onClick={handleSave}>Lagre</button>
                    <button onClick={onClose}>Avbryt</button>
                </>
            )}
        </div>
    );
};

export default ModalEdit;
