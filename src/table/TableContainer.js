import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getList, searchList } from '../actions/mainActions';
import ListItem from './ListItem/ListItem';
import './TableContainer.scss';
import TopBarComponent from './TopBarComponent';
class TableContainer extends Component {
    constructor(props){
        super(props);
        this.props.getList(0,20)
        this.state = {searchFieldValue: ''};
    }
    
    
    render() {
        console.log(this.list);
        return (
            <div>
              <TopBarComponent/>
              {this.props.currentShownList? this.props.currentShownList.map((item, index) => <ListItem key={index} index={index} payload={item} selected={this.props.selectedItems.includes(index)}></ListItem>): ' '}
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
      }
    }
}
  const mapStateToProps = state => {
    return {
        currentShownList: state.currentShownList,
        selectedItems: state.selectedItemIndexes
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
