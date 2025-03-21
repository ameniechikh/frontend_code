import React, { useState } from "react";

interface SelectProps {
  children: React.ReactNode;
  onChange?: (value: string) => void; // `onChange` est optionnel
}

export const Select = ({ children, onChange }: SelectProps) => {
  const [selected, setSelected] = useState("");

  return (
    <select
      className="p-2 border rounded w-full"
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        if (onChange) onChange(e.target.value); // Vérification avant d'appeler `onChange`
      }}
    >
      {children}
    </select>
  );
};

export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
);

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const SelectValue = ({ value }: { value: string }) => <span>{value}</span>;
