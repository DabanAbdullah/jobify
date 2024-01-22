import React from "react";

export const FormRow = ({
  type,
  name,
  LabelText,
  placeholder,
  defaultValue,
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {LabelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="form-input"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormRow;
