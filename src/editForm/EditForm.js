import React, { Component } from 'react'
import './EditForm.scss';
export default class EditForm extends Component {
    constructor(state) {
        super(state);
        this.state = {
            id: null
        }
    }
    componentDidMount () {
        if(isNaN(this.props.match.params.id)){
            throw Error("ID hasn't been passed properly to EditForm Component"); 
        } else {
            this.setState({
                id: this.props.match.params.id
            });
        }
    }
    render() {
        return (
            <div id="container">
                Form Works and id {this.state.id} has been chosen
            </div>
        )
    }
}
