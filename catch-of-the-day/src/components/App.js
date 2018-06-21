import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import fishes from '../sample-fishes';
import Fish from './Fish';
class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = fish => {
        const fishes = { ...this.state.fishes };

        fishes[`fish${Date.now()}`] = fish;

        this.setState({ fishes });
    };
    
    addToOrder = key => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    };
    
    loadSampleFishes = () => {
        this.setState({ fishes: fishes});
    };

    render() {
        return (
          <div className="catch-of-the-day">
              <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {
                            Object.keys(this.state.fishes).map(key => <Fish 
                                key={key} 
                                index={key}
                                addToOrder={this.addToOrder}
                                details={this.state.fishes[key]} 
                            />)
                        }
                    </ul>
              </div>
              <Order fishes={this.state.fishes} order={this.state.order}/>
              <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
          </div>
        );
    }
}

export default App;