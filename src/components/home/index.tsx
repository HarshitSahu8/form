import React, { FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import useFormPersist from "react-hook-form-persist";

const fieldData = [
    {
        label: "First Name",
        name: "firstName",
        autoFocus: true,
        defaultValue: "",
        rules: {
            required: {
                value: true,
                message: "First name required",
            },
        },
    },
    {
        label: "Middle Name",
        name: "middleName",
        autoFocus: false,
        defaultValue: "",
        rules: {
            required: {
                value: false,
                message: "First name required",
            },
        },
    },
    {
        label: "Last Name",
        name: "lastName",
        autoFocus: false,
        defaultValue: "",
        rules: {
            required: {
                value: true,
                message: "Last name required",
            },
        },
    },
    {
        label: "Email",
        name: "email",
        autoFocus: false,
        defaultValue: "",
        rules: {
            required: {
                value: true,
                message: "Please Provide E-Mail",
            },
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please Provide Valid Email",
            },
        },
    },
    {
        label: "Phone Number",
        name: "PhoneNo",
        autoFocus: false,
        defaultValue: "",
        rules: {
            validate: (value: unknown) => {
                if (value.length < 10 || isNaN(value)) {
                    return "Please Provide Valid Phone Number";
                }
                return true;
            },
        },
    },
];

const gender = [
    {
        value: "male",
        label: "Male",
    },
    {
        value: "female",
        label: "Female",
    },
    {
        value: "trans",
        label: "Trans",
    },
];

const Home: FC = () => {
    const { handleSubmit, control, register, formState, watch, setValue } =
        useForm();
    const { errors } = formState;
    useFormPersist("form", { watch, setValue });
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <h1>Form Validation With Persistance Of Data</h1>
                <Box display="flex" flexDirection="column">
                    {fieldData.map(({ label, name, autoFocus, rules }, idx) => (
                        <Input
                            key={`${label}_${idx}`}
                            control={control}
                            name={name}
                            label={label}
                            autoFocus={autoFocus}
                            rules={rules}
                        />
                    ))}
                    <Box display="flex" m="2%" justifyContent="center">
                        <TextField
                            select
                            fullWidth
                            defaultValue="select"
                            label="gender"
                            inputProps={register("gender", {
                                required: "Please enter Gender",
                            })}
                            error={errors.gender}
                            helperText={errors.gender?.message}
                        >
                            {gender.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Button label="Submit" type="submit" />
                </Box>
            </form>
        </Box>
    );
};

export { Home };
