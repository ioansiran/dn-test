import React, {Component} from 'react'
import './RowCountSelector.scss'
import {connect} from 'react-redux';
import {getList} from "../actions/mainActions";

class RowCountSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNumberOfRows: 20,
            options: [20, 100, 250, 500, 1000]
        }
    }

    selectOption(selectedNumberOfRows) {
        this.setState({selectedNumberOfRows: selectedNumberOfRows});
        this.props.setNumberOfRows(selectedNumberOfRows)
    }

    getButtons() {
        return this.state.options.map((item, index) => {
            let selected = item === this.state.selectedNumberOfRows && !this.props.hidden;
            return (
                <button
                    key={String(index)}
                    className={`button${selected ? "-selected" : ''}`}
                    onClick={() => this.selectOption(item)}
                >
                    {`Load${selected ? "ed" : ''} ${item} rows`}
                </button>)
        })
    }

    render() {
        return (
            <div>
                {this.getButtons()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    hidden: state.hidden
});

const mapDispatchToProps = (dispatch) => ({
    setNumberOfRows: (number) => {
        dispatch(getList(0, number))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RowCountSelector)