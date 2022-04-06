import { Button } from "@mui/material";

type Btntype = {
    label?: string;
    type?: string;
    onclick?: any;
};

const Btn = ({ label, type, onclick }: Btntype) => {
    return (
        <>
            <Button
                sx={{
                    margin: "2%",
                }}
                variant="contained"
                type={type}
                onclick={onclick}
            >
                {label}
            </Button>
        </>
    );
};

export default Btn;
