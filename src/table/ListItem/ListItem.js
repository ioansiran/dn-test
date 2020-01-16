import React, {Component} from 'react'
import './ListItem.scss'
import {connect} from 'react-redux'
import {deselectItem, selectItem} from '../../actions/mainActions'
import {Link} from "react-router-dom";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.payload.checked
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.getHighlightedText = this.getHighlightedText.bind(this)
    }

    handleToggle() {
        if (this.state.checked) {
            this.setState({checked: false});
            this.props.deselectItem(this.props.index)
        } else {
            this.setState({checked: true});
            this.props.selectItem(this.props.index)
        }

    }


    doSomethingElse(e) {
        e.stopPropagation();
        // ... do stuff
    }

    getHighlightedText(text = '', higlight = '') {
        text = text.toString();
        // Split on higlight term and include term into parts, ignore case
        if (higlight != '') {
            let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
            return <span> {parts.map((part, i) =>
                <span key={i} className={part.toLowerCase() === higlight.toLowerCase() ? 'highlighted' : {}}>
            {part}
        </span>)
            } </span>;
        } else
            return text;
    }

    render() {
        return (
            <div onClick={this.handleToggle} className={"row" + (this.props.selected ? '-checked' : '')}>
                <div className={'zoomedCheckbox'}>
                    <input
                        type="checkbox"
                        checked={this.props.selected}/>
                </div>
                <div>{this.getHighlightedText(this.props.payload.id, this.props.queryString)}</div>
                <div>{this.getHighlightedText(this.props.payload.name, this.props.queryString)}</div>
                <div>{this.getHighlightedText(this.props.payload.owner, this.props.queryString)}</div>
                <div>{this.getHighlightedText(this.props.payload.type, this.props.queryString)}</div>
                <div>{this.getHighlightedText(this.props.payload.created_date, this.props.queryString)}</div>
                <div>{this.getHighlightedText(this.props.payload.modified_date, this.props.queryString)}</div>
                <div><Link to={'/edit/' + this.props.index} onClick={this.doSomethingElse}>✒</Link></div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    selectItem: (index) => {
        dispatch(selectItem(index))
    },
    deselectItem: (index) => {
        dispatch(deselectItem(index))
    }
});
const mapStateToProps = state => ({
    allSelected: state.selectedAll,
    queryString: state.searchQuery
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);