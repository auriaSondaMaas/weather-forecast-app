/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField, Theme, SxProps } from '@mui/material'

type AutocompleteBasicProps = {
  label: string;
  valueField?: any;
  options: any;
  disableClearable?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  noOptionsText?: string
  getOptionLabel?: (option: any) => string;
  getOptionDisabled?: (option: any) => boolean;
  onChange?: (value: any) => void;
  onInputChange?: (value: any) => void;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any,
  ) => React.ReactNode;
  error?: boolean;
  helperText?: string;
};

function AutocompleteBasic ({
  label,
  valueField,
  options,
  disableClearable,
  fullWidth,
  sx,
  noOptionsText,
  getOptionLabel,
  getOptionDisabled,
  onChange,
  onInputChange,
  renderOption,
  error,
  helperText
}: AutocompleteBasicProps) {
  const [selectedValue, setSelectedValue] = useState(valueField || null)

  useEffect(() => {
    setSelectedValue(valueField || null)
  }, [valueField])

  return (
    <Autocomplete
      value={selectedValue}
      disableClearable={disableClearable}
      noOptionsText={noOptionsText || 'Sin resultados'}
      onInputChange={onInputChange}
      onChange={(_event, newValue) => {
        setSelectedValue(newValue)
        if (onChange) onChange(newValue)
      }}
      options={options}
      getOptionLabel={getOptionLabel}
      fullWidth={fullWidth}
      sx={sx}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
        />
      )}
      getOptionDisabled={getOptionDisabled}
      renderOption={renderOption}
    />
  )
}

export default AutocompleteBasic
