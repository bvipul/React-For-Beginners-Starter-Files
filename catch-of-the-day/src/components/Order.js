import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {formatPrice} from '../helpers';

class Order extends React.Component {

    static propTypes = {
        fishes: PropTypes.objectOf(PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            status: PropTypes.string,
            desc: PropTypes.string,
            price: PropTypes.number
        })),
        order: PropTypes.objectOf(PropTypes.number),
        removeFromOrder: PropTypes.func
    };
    
    renderOrder = (key) => {
        let fish = this.props.fishes[key];
        let count = this.props.order[key];
        let isAvailable = fish && fish.status === 'available';
        let transitionOptions = {
            classNames: "order",
            key,
            timeout:{ 
                enter: 250,
                exit: 250
            }
        };
        
        if(! fish) return null;
            
        if(! isAvailable ) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>{ fish ? fish.name : 'fish'} is no longer available.</li>
                </CSSTransition>
            );
        }
        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{enter:250, exit:250}}>
                                <span>{ count }</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs { fish.name }
                        
                        { formatPrice(count * fish.price) }

                        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        );
    };
    
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            let fish = this.props.fishes[key];
            let count = this.props.order[key];
            let isAvailable = fish && fish.status === 'available';
            
            if( isAvailable ) {
                return prevTotal + (count * fish.price);
            }
            
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    { orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total: <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }   
}

export default Order;