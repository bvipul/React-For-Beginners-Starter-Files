import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    myInput = React.createRef();

    handleSubmit = event => {
        event.preventDefault();
        
        const storeName = this.myInput.value.value;

        this.props.history.push(`/store/${ storeName }`);
    }

    render() {
        return (
            <form action="" className="store-selector" onSubmit={this.handleSubmit}>
                <h2>Please Enter A Store</h2>
                <input 
                    type="text" 
                    ref={this.myInput}
                    required 
                    placeholder="Store Name" 
                    defaultValue={ getFunName() } 
                />
                <button type="submit">Visit Store -></button>
            </form>
        );
    }
}

export default StorePicker;