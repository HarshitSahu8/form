import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import Box from "@mui/material/Box";

type FormValues = {
    name: string;
    type?: string;
    rules?: unknown;
    control?: unknown;
    label?: unknown;
    autoFocus?: boolean;
};

const Input = ({
    name,
    control,
    label,
    type,
    rules,
    autoFocus,
    defaultValue,
    ...rest
}: FormValues) => {
    return (
        <Box>
            <Controller
                control={control}
                defaultValue=""
                name={name}
                render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                }) => (
                    <TextField
                        sx={{
                            margin: "2%",
                            width: "100%",
                        }}
                        label={label}
                        variant="standard"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error?.message}
                        autoFocus={autoFocus}
                        onBlur={onBlur}
                        defaultValue={defaultValue}
                    />
                )}
                rules={rules}
            />
        </Box>
    );
};
export default Input;
