import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deselectAll, getList, searchList, selectAll} from '../actions/mainActions';
import ListItem from './ListItem/ListItem';
import './TableContainer.scss';
import TopBarComponent from './TopBarComponent';

class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {searchFieldValue: '', checked: false, indeterminate: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        if (this.props.selectedAll) {
            this.props.deselectAll();
            return;
        }
        if (this.props.selectedSome) {
            this.props.deselectAll();
            return;
        }
        if (!this.props.selectedSome) {
            this.props.selectAll();
        }

    }

    render() {
        console.log(this.list);
        return (
            <div>
                <TopBarComponent/>
                <div className="row">
                    <div className={'zoomedCheckbox'}>
                        <input
                            type={"checkbox"}
                            onChange={this.handleChange}
                            checked={this.props.selectedAll}
                            disabled={this.props.hidden}
                            className={this.props.selectedSome && !this.props.selectedAll ? 'intermediate' : ''}
                        />
                    </div>
                    <div>ID</div>
                    <div>Name</div>
                    <div>Owner</div>
                    <div>Type</div>
                    <div>Created on</div>
                    <div>Last modified</div>
                    <div>Edit</div>
                </div>
                {this.props.currentShownList.length > 0 && !this.props.hidden ? this.props.currentShownList.map((item, index) => {
                    return (
                        <ListItem
                            key={index}
                            index={index}
                            payload={item}
                            selected={item.checked}
                        />)
                }) : <h1 className={'noItems'}>No items found</h1>}
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
        selectedSome: state.selectedSome,
        selectedItemCount: state.selectedItemCount,
        hidden: state.hidden
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
