import { Control, Controller, FieldErrors } from "react-hook-form";

import { Input, InputField, Text } from "@gluestack-ui/themed";

type TextInputProps = {
  control: Control<any>;
  placeholder: string;
  name: string;
  errors: FieldErrors;
};

export default function TextInput({
  placeholder,
  control,
  errors,
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
            borderColor: "#000000",
            borderRadius: 50,
          }}
        >
          <InputField
            onBlur={onBlur}
            values={value}
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
          {errors.firstName && <Text>{errors?.root?.message}</Text>}
        </Input>
      )}
      name="name"
    />
  );
}
