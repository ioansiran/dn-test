import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getList, searchList, deselectAll, selectAll } from '../actions/mainActions';
import ListItem from './ListItem/ListItem';
import './TableContainer.scss';
import TopBarComponent from './TopBarComponent';
import Checkbox from 'react-three-state-checkbox'

class TableContainer extends Component {
    constructor(props){
        super(props);
        this.props.getList(0,20)
        this.state = {searchFieldValue: '',checked: false,indeterminate: false};
        this.getElements = this.getElements.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    getElements() {
      return this.props.currentShownList? this.props.currentShownList.map((item, index) => {
        return (
          <ListItem 
            key={index}   
            index={index} 
            payload={item} 
            selected={this.props.selectedItems.includes(index)}/>)
          }):'Deez nuts';
    }   
    componentWillMount(){
      this.setState({
        checked:this.props.selectedItems.length>0,
        indeterminate: this.props.selectedItems.length && (this.props.selectedItems.length < this.props.totalDataLenght)
      })
    }
    handleChange (){
      if (this.props.selectedItems.length>0){
        this.props.deselectAll();
      } else {
        this.props.selectAll();
      }
    }
    render() {
        console.log(this.list);
        return (
            <div>
              <TopBarComponent/>
              <div onClick={this.handleToggle} className={"row"+(this.state.checked?'-checked':'')}>
                
                <Checkbox
                  checked={this.props.selectedItems.length>0}
                  indeterminate={this.props.selectedItems.length && (this.props.selectedItems.length < this.props.totalDataLenght)}
                  onChange={this.handleChange}
                ></Checkbox>
                <div>ID</div>
                <div>name</div>
                <div>owner</div>
                <div>type</div>
                <div>created_date</div>
                <div>modified_date</div>
            </div>
              {this.props.currentShownList? this.props.currentShownList.map((item, index) => {
                return (
                  <ListItem 
                    key={index}   
                    index={index} 
                    payload={item} 
                    selected={this.props.selectedItems}/>)
                  }):'Deez nuts'}
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
      selectAll: ()=> {
        dispatch(selectAll());
      }
    }
}
  const mapStateToProps = state => {
    return {
        currentShownList: state.currentShownList,
        selectedItems: state.selectedItemIndexes,
        totalDataLenght: state.totalItemCount
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
