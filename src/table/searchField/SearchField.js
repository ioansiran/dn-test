import React, {Component} from 'react'
import {connect} from 'react-redux';
import {clearSearch, searchList} from '../../actions/mainActions';

class SearchField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        this.setState({value: ''});
        this.props.clearSearch();
    }
    handleChange(event) {
        this.setState({value:event.target.value});
        if (event.target.value.length<3)
            this.props.clearSearch();
        if((event.target.value.length >=3 && isNaN(event.target.value)) ||
            (event.target.value.length >=1 && !isNaN(event.target.value))){            
            this.props.triggerSearch(event.target.value);
        }
    }
    
    render() {
        return (
            <div>
                <input
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <button
                    onClick={this.handleClick}
                >X
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
    triggerSearch: (queryString) => {
        dispatch(searchList(queryString))
    },
    clearSearch: () => {
        dispatch(clearSearch())
    }
});

export default connect(null, mapDispatchToProps)(SearchField);
