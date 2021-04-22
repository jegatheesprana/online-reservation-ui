import { useContext, useState } from "react";

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const UserProvider = ({ children }) => {

    const [user, setUser] = useState()

    const login = (phone, password) => {

    }

    const signUp = (phone, eamil, password) => {

    }

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + '/users/currentUser')
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(console.log)
    }, [])

    const value = {
        user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

UserProvider.context = AuthContext;
export default UserProvider;