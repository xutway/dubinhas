import { Control, Controller, FieldErrors } from "react-hook-form";

import { Input, InputField } from "@gluestack-ui/themed";

type TextInputProps = {
  control: Control<any>;
  placeholder: string;
  name: string;
  errors: FieldErrors;
  disabled?: boolean;
};

export default function TextInput({
  placeholder,
  control,
  errors,
  disabled,
}: TextInputProps) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          variant="outline"
          style={{
            borderColor: errors?.name ? "red" : "#000000",
            borderRadius: 50,
          }}
          isDisabled={disabled}
        >
          <InputField
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            style={{
              fontSize: 14,
              color: "#000",
              fontWeight: "200",
              width: "100%",
              backgroundColor: "#F6F5F5",
            }}
            placeholderTextColor="#000"
            placeholder={placeholder}
          />
        </Input>
      )}
      name="name"
    />
  );
}
