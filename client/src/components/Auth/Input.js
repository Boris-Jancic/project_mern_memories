import React from 'react';
import {Grid, TextField, IconButton, InputAdornment} from '@material-ui/core'
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Input = ({name, label, handleChange, autoFocus, half, type, handleShowPassword}) => {
    return (
        <Grid xs={6} xm={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                onChange={handleChange}
                autoFocus={autoFocus}
                xs={6}
                required
                fullWidth
                variant="outlined"
                type={type}
                InputProps={name === "password" ? {
                    endAdornment: (
                        <InputAdornment position={"end"}>
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null }
            />
        </Grid>
    );
}

export default Input;
