import React, {Component} from 'react'
import './EditForm.scss';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {updateItem} from "../actions/mainActions";
import {useHistory} from "react-router-dom";
import * as spinnerImage from './spinner.gif'

class EditForm extends Component {
    constructor(state) {
        super(state);
        this.state = {
            showSavingSpinner: false,
            readOnly: true,
            index: this.props.match.params.id,
            payload: this.props.currentShownList[this.props.match.params.id]
        };

        this.validateAndSave = this.validateAndSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (isNaN(this.props.match.params.id)) {
            throw Error("ID hasn't been passed properly to EditForm Component");
        } else {
            this.setState({
                index: this.props.match.params.id
            });
        }
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'id':
                this.setState({payload: {...this.state.payload, id: e.target.value}});
                break;
            case 'name':
                this.setState({payload: {...this.state.payload, name: e.target.value}});
                break;
            case 'owner':
                this.setState({payload: {...this.state.payload, owner: e.target.value}});
                break;
            case 'type':
                this.setState({payload: {...this.state.payload, type: e.target.value}});
                break
        }
    }

    validateAndSave() {

        this.setState({payload: {...this.state.payload, modified_date: new Date().toISOString()}}, () => {
            this.props.updateItem(this.state.payload);
            this.setState({showSavingSpinner: true});
            setTimeout(_ => {
                this.props.history.push("/table");

            }, 500)
        });

    }

    render() {
        return (
            <div className={'editFormContainer'}>
                <div className={'editBox'}>
                    <div className={'header'}>EDIT
                        <button onClick={() => {
                            this.setState({readOnly: false})
                        }}>📝</button></div>
                    <div className={'editBody'}>
                        <form>
                            <div className={'editRow'}>
                                <div>
                                    <label htmlFor={'id'}>ID</label>
                                    <input
                                        disabled={true}
                                        type={'text'}
                                        name={'id'}
                                        onChange={this.handleChange}
                                        value={this.state.payload.id}/>
                                </div>
                                <div>
                                    <label htmlFor={'name'}>Name</label>
                                    <input disabled={this.state.readOnly === true} type={'text'} name={'name'}
                                           onChange={this.handleChange}
                                           value={this.state.payload.name}/>
                                </div>
                            </div>

                            <div className={'editRow'}>
                                <div>
                                    <label htmlFor={'owner'}>Owner</label>
                                    <input disabled={this.state.readOnly === true} type={'text'} name={'owner'}
                                           onChange={this.handleChange}
                                           value={this.state.payload.owner}/>
                                </div>
                                <div>
                                    <label htmlFor={'type'}>Type</label>
                                    <input disabled={this.state.readOnly === true} type={'text'} name={'type'}
                                           onChange={this.handleChange}
                                           value={this.state.payload.type}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={'buttonRow'}>
                        <button onClick={_ => {
                            this.props.history.push("/table")
                        }}>
                            Cancel
                        </button>
                        <button
                            disabled={this.state.readOnly}
                            onClick={this.validateAndSave}>

                            {this.state.showSavingSpinner ? `Loading...` : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentShownList: state.currentShownList
});
const mapDispatchToProps = dispatch => ({
    updateItem: (payload) => {
        dispatch(updateItem(payload))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);