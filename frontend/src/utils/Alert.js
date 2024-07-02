// alert.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ message, type }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'} ${visible ? 'alert-enter' : 'alert-leave'}`}
        >
            {message}
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default Alert;
