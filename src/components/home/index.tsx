import React, { FC } from "react";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

const fieldData = [
    {
        label: "First Name",
        name: "firstName",
        autoFocus: true,
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
        rules: {
            validate: (value) => {
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
    const [initialState, setinitialState] = useState({});
    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            setinitialState(JSON.parse(data));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(initialState));
        console.log(initialState);
    });
    const onChangeHandler = (e) => {
        console.log("hel");
        const value = e.target.value;
        setinitialState({
            ...initialState,
            user: {
                ...initialState.user,
                [e.target.name]: value,
            },
        });
    };
    const { handleSubmit, control, register, formState } = useForm({
        defaultValue: {
            Gender: gender[0].value,
        },
    });
    const { errors } = formState;
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <form>
                <h1>Form Validation With Persistance Of Data</h1>
                <Box display="flex" flexDirection="column">
                    {fieldData.map(({ label, name, autoFocus, rules }, idx) => (
                        <TextField
                            sx={{ margin: "2%" }}
                            key={`${label}_${idx}`}
                            control={control}
                            id="standard-basic"
                            name={name}
                            label={label}
                            autoFocus={autoFocus}
                            rules={rules}
                            onChange={onChangeHandler}
                        />
                    ))}
                    <Box display="flex" m="2%" justifyContent="center">
                        <TextField
                            select
                            fullWidth
                            defaultValue="select"
                            label="Gender"
                            inputProps={register("Gender", {
                                required: "Please enter Gender",
                            })}
                            error={errors.Gender}
                            helperText={errors.gender?.message}
                            onChange={onChangeHandler}
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
                    <Button
                        label="Submit"
                        type="submit"
                        onclick={handleSubmit}
                    />
                </Box>
            </form>
        </Box>
    );
};

export { Home };
