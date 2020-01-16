import React, {Component} from 'react'
import {connect} from 'react-redux';
import './SearchField.scss'
import {clearSearch, searchList} from '../../actions/mainActions';

class SearchField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.searchQuery
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
                    className={'searchField'}
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder={'filter results'}
                />
                <button
                    className={'cancelButton'}
                    onClick={this.handleClick}
                >X
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    searchQuery: state.searchQuery
});

const mapDispatchToProps = dispatch => ({
    triggerSearch: (queryString) => {
        dispatch(searchList(queryString))
    },
    clearSearch: () => {
        dispatch(clearSearch())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
