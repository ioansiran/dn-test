import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deselectAll, getList, searchList, selectAll} from '../actions/mainActions';
import ListItem from './ListItem/ListItem';
import './TableContainer.scss';
import TopBarComponent from './TopBarComponent';
import Checkbox from 'react-three-state-checkbox'

class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.props.getList(0, 20);
        this.state = {searchFieldValue: '', checked: false, indeterminate: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        if (this.props.selectedAll) {
            this.props.deselectAll();
        } else if (this.props.deselectedAll) {
            this.props.selectAll();
        } else if (this.props.someSelected) {
            this.props.deselectAll();
        }
    }

    render() {
        console.log(this.list);
        return (
            <div>
                <TopBarComponent/>
                <div className="row">
                    <Checkbox
                        onChange={this.handleChange}
                        checked={this.props.selectedAll && !this.props.someSelected}
                        intermediate={this.props.someSelected}
                    />
                    <div>ID</div>
                    <div>name</div>
                    <div>owner</div>
                    <div>type</div>
                    <div>created_date</div>
                    <div>modified_date</div>
                </div>
                {this.props.currentShownList ? this.props.currentShownList.map((item, index) => {
                    return (
                        <ListItem
                            key={index}
                            index={index}
                            payload={item}/>)
                }) : 'Deez nuts'}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getList: (lowerLimit, upperLimit) => {
            dispatch(getList(lowerLimit, upperLimit))
        },
        search: (query) => {
            dispatch(searchList(query));
        },
        deselectAll: () => {
            dispatch(deselectAll());
        },
        selectAll: () => {
            dispatch(selectAll());
        }
    }
};
const mapStateToProps = state => {
    return {
        currentShownList: state.currentShownList,
        selectedItems: state.selectedItemIndexes,
        totalDataLenght: state.totalItemCount,
        selectedAll: state.selectedAll,
        deselectedAll: state.deselectedAll,
        someSelected: state.someChecked
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
