import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

/**
 * FormTextField component for reusable form inputs.
 */
function FormTextField({
  label,
  name,
  value,
  onChange,
  required,
  type = 'text',
  error,
  helperText,
  adornment,
  multiline,
  rows,
  disabled,
}) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      fullWidth
      error={!!error}
      helperText={helperText}
      InputProps={adornment ? { startAdornment: <InputAdornment position="start">{adornment}</InputAdornment> } : null}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
    />
  );
}

export default FormTextField;