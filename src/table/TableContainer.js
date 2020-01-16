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

    // TODO - De facut lag de validate
    render() {
        console.log(this.list);
        return (
            <div>
                <TopBarComponent/>
                <div className="row">
                    <input
                        type={"checkbox"}
                        onChange={this.handleChange}
                        checked={this.props.selectedAll}
                        disabled={this.props.hidden}
                        className={this.props.selectedSome && !this.props.selectedAll ? 'intermediate' : ''}
                    />
                    <div>ID</div>
                    <div>name</div>
                    <div>owner</div>
                    <div>type</div>
                    <div>created_date</div>
                    <div>modified_date</div>
                </div>
                {this.props.currentShownList && !this.props.hidden ? this.props.currentShownList.map((item, index) => {
                    return (
                        <ListItem
                            key={index}
                            index={index}
                            payload={item}
                            selected={item.checked}
                        />)
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
        selectedSome: state.selectedSome,
        selectedItemCount: state.selectedItemCount,
        hidden: state.hidden
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
