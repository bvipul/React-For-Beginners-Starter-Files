import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
    return (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign In to manage your store's inventory.</p>
        <button className="github" onClick={() => props.authenticate('Github')}>Log In With Github</button>
        <button className="twitter" onClick={() => props.authenticate('Twitter')}>Log In With Twitter</button>
    </nav>);
};

Login.propTypes = {
    authenticate: PropTypes.func
};

export default Login;