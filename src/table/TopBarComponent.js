import React, { Component } from 'react'
import RowCountSelector from "./RowCountSelector";
import SearchField from "./searchField/SearchField";
import { connect } from 'react-redux';
import './TopBarComponent.scss'
import { deleteItems } from '../actions/mainActions';
class TopBarComponent extends Component {
    
    constructor (props){
        super(props);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        
    }
    handleRemoveClick(){
        this.props.removeRows();
    }
    render() {
        return (
            <div className="topBar">
                <SearchField/>
                <p>{!this.props.listItemCount?'0':this.props.listItemCount} items selected</p>
                <RowCountSelector/>
                { (!this.props.isRowsRemoved) && <button onClick={this.handleRemoveClick}>Remove rows</button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    listItemCount:state.selectedItemIndexes?.length,
    isRowsRemoved: state.currentShownList.length == 0
})
const mapDispatchToProps = (dispatch) => ({
    removeRows: ()=> {dispatch(deleteItems())}
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBarComponent);