/*
* Custom Button Component using Material UI Button.
* */

import React from 'react';
import PropTypes from 'prop-types';
import MaterialUiButton from '@material-ui/core/Button';

import './button.scss'

const Button = ({buttonText, onClick, disabled}) => {
    return(
        <MaterialUiButton disabled={disabled} onClick={()=> onClick()} disableRipple variant="contained" color="primary">
            {buttonText}
        </MaterialUiButton>
    )
}

Button.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default Button
