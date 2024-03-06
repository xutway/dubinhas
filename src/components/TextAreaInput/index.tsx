import { Control, Controller, FieldErrors } from "react-hook-form";

import { Text, Textarea, TextareaInput } from "@gluestack-ui/themed";

type TextInputProps = {
  control: Control<any>;
  placeholder: string;
  name: string;
  errors: FieldErrors;
  disabled?: boolean;
};

export default function TextAreaInput({
  placeholder,
  control,
  name,
  errors,
  disabled,
}: TextInputProps) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <Textarea
          style={{
            borderColor: errors?.[name] ? "red" : "#000000",
            borderRadius: 20,
            width: "100%",
            backgroundColor: "#F6F5F5",
          }}
          isDisabled={disabled}
          w="$64"
        >
          <TextareaInput
            placeholder={placeholder}
            value={value}
            onChangeText={(e) => onChange(e)}
            style={{
              fontSize: 14,
              color: "#000",
              fontWeight: "200",
            }}
            placeholderTextColor="#000"
          />
          {errors.firstName && <Text>{errors?.root?.message}</Text>}
        </Textarea>
      )}
      name={name}
    />
  );
}
