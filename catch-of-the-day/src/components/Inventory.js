import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.objectOf(PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            status: PropTypes.string,
            desc: PropTypes.string,
            price: PropTypes.number
        })), 
        addFish: PropTypes.func,
        removeFish: PropTypes.func,
        updateFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        storeId: PropTypes.string
    };

    state = {
        uid: null,
        owner: null 
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        });
    };

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    authHandler = async (authData) => {
        const store = await base.fetch(this.props.storeId, {context: this});
        if (! store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }

        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
        console.log(authData);
    };

    logout = async () => {
        await firebase.auth().signOut();
        
        this.setState({
            uid: null
        });
    };

    render() {

        const logout = <button className="logout" onClick={this.logout}>Log out</button>;

        if(! this.state.uid) {
            return <Login authenticate={this.authenticate}/>;
        }

        if(this.state.uid !== this.state.owner) {
            return (
                <div>Sorry, you are not the owner of the store!
                { logout }
                </div>
            );
        }
        return (
            <div className="inventory">
                <h2>
                    Inventory !!!
                </h2>
                { logout }
                {Object.keys(this.props.fishes).map((key)=> <EditFishForm 
                    fish={this.props.fishes[key]} 
                    key={key} 
                    index={key} 
                    updateFish={this.props.updateFish} 
                    removeFish={this.props.removeFish}
                />)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Samples</button>
            </div>
        );
    }
}

export default Inventory;