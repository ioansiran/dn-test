import React, {Component} from 'react'
import './ListItem.scss'
import {connect} from 'react-redux'
import {deselectItem, selectItem} from '../../actions/mainActions'

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.payload.checked
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        if (this.state.checked) {
            this.setState({checked: false});
            this.props.deselectItem(this.props.index)
        } else {
            this.setState({checked: true});
            this.props.selectItem(this.props.index)
        }

    }

    render() {
        return (
            <div onClick={this.handleToggle} className={"row" + (this.props.payload.checked ? '-checked' : '')}>
                <input
                    type="checkbox"
                    checked={this.props.payload.checked}/>
                <div>{this.props.payload.id}</div>
                <div>{this.props.payload.name}</div>
                <div>{this.props.payload.owner}</div>
                <div>{this.props.payload.type}</div>
                <div>{this.props.payload.created_date}</div>
                <div>{this.props.payload.modified_date}</div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    selectItem: (index) => {
        dispatch(selectItem(index))
    },
    deselectItem: (index) => {
        dispatch(deselectItem(index))
    }
});
const mapStateToProps = state => ({
    allDeselected: state.deselectedAll,
    allSelected: state.selectedAll
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);