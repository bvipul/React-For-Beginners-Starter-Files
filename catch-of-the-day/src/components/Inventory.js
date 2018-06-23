import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

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
        loadSampleFishes: PropTypes.func
    };

    render() {
        return (
            <div className="inventory">
                <h2>
                    Inventory !!!
                </h2>
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