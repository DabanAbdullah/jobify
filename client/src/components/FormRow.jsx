import React from "react";

export const FormRow = ({
  type,
  name,
  LabelText,
  placeholder,
  value,
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
        value={value}
        className="form-input"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormRow;
