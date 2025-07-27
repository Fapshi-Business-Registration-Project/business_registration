// /components/forms/FormParts.tsx
"use client";

import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

// Type for select items
export interface SelectItem {
  value: string;
  label: string;
}

// Props interface for FormInput
export interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'search' | 'date';
  disabled?: boolean;
}

// Props interface for FormSelect
export interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  items: readonly SelectItem[];
  disabled?: boolean;
}

// Reusable Input Field with proper typing
export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled = false
}: FormInputProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            {...field}
            // Handle number input conversion
            value={type === 'number' ? field.value || '' : field.value}
            onChange={(e) => {
              if (type === 'number') {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                field.onChange(value);
              } else {
                field.onChange(e.target.value);
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Reusable Select Field with proper typing
export const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  items,
  disabled = false
}: FormSelectProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          disabled={disabled}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Display name for better debugging
FormInput.displayName = 'FormInput';
FormSelect.displayName = 'FormSelect';