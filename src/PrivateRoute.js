import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './contexts/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={props => (
                user && user.loggedIn
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
            )}
        >

        </Route>
    );
}

export default PrivateRoute;