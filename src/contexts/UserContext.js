import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)

    const login = (email, password) => {
        return fetch(process.env.REACT_APP_API_HOST + '/users/login', {
            credentials: "include",
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
    }

    const signup = (name, email, password) => {
        // return fetch(process.env.REACT_APP_API_HOST + '/users/register', {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ data: 'data' })
        // })
        return fetch(process.env.REACT_APP_API_HOST + '/users/register', {
            method: 'GET'
        })
    }

    const logout = () => {
        console.log('Logout')
    }

    useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_API_HOST + '/users/currentUser', {
            credentials: "include",
        })
            .then(res => res.json())
            .then(res => {
                setUser(res);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setUser(false)
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        console.log({ user })
    }, [user])

    const value = {
        user,
        signup,
        login,
        logout,
        setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}