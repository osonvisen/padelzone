import React from "react";

interface InputField {
    name: string;
    placeholder: string;
    type: string;
    label: string;
    value?: string;
}
interface InputFormProps {
    fields: InputField[];
    onChange: (name: string, value: string) => void;
    onSubmit: () => void;
    buttonLabel?: string;
}

const InputForm: React.FC<InputFormProps> = ({
    fields,
    onChange,
    onSubmit,
    buttonLabel = "Submit",
}) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault(); // Forhindre standard oppførsel
                onSubmit(); // Kall submit-funksjonen
            }}
        >
            {fields.map((field, index) => (
                <div key={field.name}>
                    <label>{field.label}</label>
                    <input
                        id={index}
                        className="show-spacing"
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) =>
                            onChange(e.target.name, e.target.value)
                        } // Send tilbake oppdatert verdi
                    />
                </div>
            ))}
            <button type="submit">{buttonLabel}</button>
        </form>
    );
};
export default InputForm;
