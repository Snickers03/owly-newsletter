import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
}

export const BaseFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
  autoComplete, // Destructure the new prop
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className='flex justify-between'>
            <FormLabel>{label}</FormLabel>
            <div className='h-4'>
              <FormMessage />
            </div>
          </div>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
