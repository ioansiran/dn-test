import React, {Component} from 'react';
import {connect} from "react-redux";

class SelectionCounter extends Component {
    render() {
        return (
            <p>{!this.props.count ? '' : `${this.props.count} items selected`} </p>
        );
    }
}

const mapStateToProps = state => ({
    count: state.selectedItemsCount,
});
export default connect(mapStateToProps)(SelectionCounter);