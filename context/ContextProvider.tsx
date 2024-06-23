"use client"

import { createContext, ReactNode, useContext, useState } from 'react';


const AppContext = createContext<any>(undefined);

type User = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export const AppWrapper = ({ children } : { children : ReactNode}) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    })
    const [signin, setSignIn] = useState({
        email: "",
        password: "",
    })

    
    const handleLoginSubmit = () => {

        console.log('login: ', signin)
        // localStorage.setItem('first_name', user)
    }
    

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                signin, setSignIn, handleLoginSubmit
            }}
        >
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)