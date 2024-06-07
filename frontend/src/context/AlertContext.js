import React, { createContext, useState, useContext } from 'react';
import Alert from '../utils/Alert';

const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => {
            setAlert(null);
        }, 3300); // Ensure this time allows for the exit transition
    };

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            {alert && <Alert message={alert.message} type={alert.type} />}
        </AlertContext.Provider>
    );
};
