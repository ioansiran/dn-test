import React, {Component} from 'react'
import RowCountSelector from "./RowCountSelector";
import SearchField from "./searchField/SearchField";
import {connect} from 'react-redux';
import './TopBarComponent.scss'
import {deleteItems} from '../actions/mainActions';
import SelectionCounter from "./selectionCounter/SelectionCounter";

class TopBarComponent extends Component {

    constructor(props) {
        super(props);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
    }

    handleRemoveClick() {
        this.props.removeRows();
    }
    render() {
        return (
            <div className="topBar">
                <SearchField/>
                <SelectionCounter/>
                <RowCountSelector/>
                {(!this.props.hidden) &&
                <button className={'removeButton'} onClick={this.handleRemoveClick}>Remove rows</button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    listItemCount: state.selectedItemIndexes?.length,
    isRowsRemoved: state.currentShownList.length === 0,
    count: state.selectedItemsCount,
    hidden: state.hidden
});
const mapDispatchToProps = (dispatch) => ({
    removeRows: () => {
        dispatch(deleteItems())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBarComponent);