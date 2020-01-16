import data from "../mockDataProvider.js";
import Helper from "./helper";

const initialState = {
    currentShownList: data.slice(0.20), // contains the list that's currently displayed
    searchQuery: '', // search query string
    searching: false,
    totalItemCount: data.length, // flag for showing search results
    currentListLimits: {
        lowerLimit: 0,
        upperLimit: 20
    },
    selectedItemsCount: 0,
    data
};

export default function mainReducer(state = initialState, action) {

    let dataToDisplay, searchResults;
    switch (action.type) {
        case "GET_LIST":
            let checkedStateUnseen = Helper.checkSelectedOrUnselectedAll(state.data, action.data.upperLimit, 999);
            let checkedstateSeen = Helper.checkSelectedOrUnselectedAll(state.data, 0, action.data.upperLimit);
            return {
                ...state,
                selectedAll: checkedstateSeen.selectedAll,
                selectedSome: checkedstateSeen.selectedSome || checkedStateUnseen.selectedSome,
                currentListLimits: action.data,
                currentShownList: state.data.slice(action.data.lowerLimit, action.data.upperLimit),
                hidden: false,
                searching: false,
                searchQuery: ''
            };
        case "SELECT_ITEM":
            state.data[action.data].checked = true;
            return {
                ...state,
                ...Helper.checkSelectedOrUnselectedAll(state.data, state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),
                currentShownList: state.data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),

            };
        case "DESELECT_ITEM":
            state.data[action.data].checked = false;
            return {
                ...state,
                ...Helper.checkSelectedOrUnselectedAll(state.data, state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),
                currentShownList: state.data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),
            };
        case "DESELECT_ALL":
            state.data.forEach(i => i.checked = false);
            return {
                ...state,
                ...Helper.checkSelectedOrUnselectedAll(state.data, 0, 1000),
                currentShownList: state.data.slice(0, state.currentListLimits.upperLimit)
            };
        case "SELECT_ALL":
            dataToDisplay = state.currentShownList.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit).map(i => {
                i.checked = true;
                return i;
            });
            return {
                ...state,
                selectedAll: true,
                selectedSome: false,
                currentShownList: dataToDisplay,
                selectedItemsCount: Helper.checkSelectedOrUnselectedAll(state.data, 0, 1000).selectedItemsCount
            };
        case "DELETE_ITEMS":
            return {
                ...state,
                currentShownList: [],
                hidden: true
            };
        // TODO - only search in current row constraints
        case "SEARCH_ITEM":
            searchResults = state.data.slice(0, state.currentListLimits.upperLimit).filter(item => {
                return JSON.stringify(item).toLowerCase().includes(action.data.toLowerCase())
            });
            return {
                ...state,
                searching: true,
                searchQuery: action.data,
                ...Helper.checkSelectedOrUnselectedAll(searchResults, 0, searchResults.length),

                currentShownList: searchResults
            };
        case "CLEAR_SEARCH":
            return {
                ...state,
                searching: false,
                ...Helper.checkSelectedOrUnselectedAll(state.currentShownList, 0, state.currentShownList.length),
                searchQuery: '',
                ...Helper.checkSelectedOrUnselectedAll(state.data, 0, state.currentListLimits.upperLimit),
                currentShownList: state.data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit)
            };
        case 'UPDATE_ITEM':

            return {
                ...state,
                data: state.data.map((item) => {
                    if (item.id == action.data.id) {
                        return action.data;
                    }
                    return item;
                })
            };
        default:
            return state;
    }
}
