import React, { Component } from 'react'
import './ListItem.scss'
import { connect } from 'react-redux'
import { selectItem, deselectItem } from '../../actions/mainActions'
class ListItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            checked:props.selected
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle(event){
        this.setState({checked:!this.state.checked}, _ => {
            if(this.state.checked){
                this.props.selectItem(this.props.index)
            } else {
                this.props.deselectItem(this.props.index)
            }
        })        

    }
    render() {
        return (
            <div onClick={this.handleToggle} className={"row"+(this.state.checked?'-checked':'')}>
                <input
                        type="checkbox"
                        checked={this.state.checked}
                />
                
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
  selectItem:(index)=> { 
      dispatch(selectItem(index)) 
    }, 
    deselectItem:(index)=> {
        dispatch(deselectItem(index))
    }
})

export default connect(null, mapDispatchToProps)(ListItem);