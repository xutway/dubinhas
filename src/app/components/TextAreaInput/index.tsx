import { Control, Controller, FieldErrors } from "react-hook-form";

import { Text, Textarea, TextareaInput } from "@gluestack-ui/themed";

type TextInputProps = {
  control: Control<any>;
  placeholder: string;
  name: string;
  errors: FieldErrors;
};

export default function TextAreaInput({
  placeholder,
  control,
  name,
  errors,
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
          w="$64"
        >
          <TextareaInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
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
