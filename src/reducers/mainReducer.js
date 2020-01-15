import data from "../mockDataProvider.js";
import Helper from "./helper";

const initialState = {
    currentShownList: [], // contains the list that's currently displayed
    searchQuery: '', // search query string
    searching: false,
    totalItemCount: data.length, // flag for showing search results
    currentListLimits: {
        lowerLimit: 0,
        upperLimit: 20
    }
};

export default function mainReducer(state = initialState, action){
    
    let dataToDisplay, searchResults;
    switch (action.type) {
        case "GET_LIST":
            if (state.searching) {
                searchResults = data.filter(item => {
                    return JSON.stringify(item).toLowerCase().includes(state.searchQuery.toLowerCase())
                });
                dataToDisplay = searchResults;
            } else {
                dataToDisplay = data;
            }
            return {
                ...state,
                currentListLimits: action.data,
                currentShownList: dataToDisplay.slice(action.data.lowerLimit, action.data.upperLimit)
            };
        case "SELECT_ITEM":
            data[action.data].checked = true;

            return {
                ...state,
                ...Helper.checkSelectedOrUnselectedAll(data, state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),
                currentShownList: data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit)
            };
        case "DESELECT_ITEM":
            data[action.data].checked = false;
            return {
                ...state,
                ...Helper.checkSelectedOrUnselectedAll(data, state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),
                currentShownList: data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit)
            };
        case "DESELECT_ALL":
            for (let i = 0; i < data.length; i++)
                data[i].checked = false;
            return {
                ...state,
                selectedAll: false,
                deselectedAll: true,
                someChecked: false,
                currentShownList: data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit)
            };
        case "SELECT_ALL":
            dataToDisplay = data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit).map(i => {
                i.checked = true;
                return i;
            });
            return {
                ...state,
                selectedAll: true,
                deselectedAll: false,
                someChecked: false,
                currentShownList: dataToDisplay
            };
        case "DELETE_ITEMS":
            return {
                ...state,
                currentShownList: []
            };
        case "SEARCH_ITEM":
            searchResults = data.filter(item => {
                return JSON.stringify(item).toLowerCase().includes(action.data.toLowerCase())
            });
            return {
                ...state,
                searching: true,
                searchQuery: action.data,
                currentShownList: searchResults.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit)
            };
        case "CLEAR_SEARCH":
            return {
                ...state,
                searching: false,
                searchQuery: '',
                currentShownList: data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit)
            };
        default:
            return state;
    }
}
