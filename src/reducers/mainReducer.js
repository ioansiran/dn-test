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
    },
    selectedItemsCount: 0
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
            let checkedStateUnseen = Helper.checkSelectedOrUnselectedAll(data, action.data.upperLimit, 999);
            let checkedstateSeen = Helper.checkSelectedOrUnselectedAll(data, 0, action.data.upperLimit);
            return {
                ...state,
                selectedAll: checkedstateSeen.selectedAll,
                selectedSome: checkedstateSeen.selectedSome || checkedStateUnseen.selectedSome,
                currentListLimits: action.data,
                currentShownList: dataToDisplay.slice(action.data.lowerLimit, action.data.upperLimit),
                hidden: false
            };
        case "SELECT_ITEM":
            data[action.data].checked = true;
            return {
                ...state,
                ...Helper.checkSelectedOrUnselectedAll(data, state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),
                currentShownList: data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),

            };
        case "DESELECT_ITEM":
            data[action.data].checked = false;
            return {
                ...state,
                ...Helper.checkSelectedOrUnselectedAll(data, state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),
                currentShownList: data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit),
            };
        case "DESELECT_ALL":
            data.forEach(i => i.checked = false);
            return {
                ...state,
                ...Helper.checkSelectedOrUnselectedAll(data, 0, 1000),
                currentShownList: data.slice(0, state.currentListLimits.upperLimit)
            }
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
                selectedItemsCount: Helper.checkSelectedOrUnselectedAll(data, 0, 1000).selectedItemsCount
            };
        case "DELETE_ITEMS":
            return {
                ...state,
                currentShownList: [],
                hidden: true
            };
        case "SEARCH_ITEM":
            searchResults = data.filter(item => {
                return JSON.stringify(item).toLowerCase().includes(action.data.toLowerCase())
            });
            return {
                ...state,
                searching: true,
                searchQuery: action.data,
                ...Helper.checkSelectedOrUnselectedAll(searchResults, 0, searchResults.length),

                currentShownList: searchResults.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit)
            };
        case "CLEAR_SEARCH":
            return {
                ...state,
                searching: false,
                ...Helper.checkSelectedOrUnselectedAll(state.currentShownList, 0, state.currentShownList.length),
                searchQuery: '',
                ...Helper.checkSelectedOrUnselectedAll(data, 0, state.currentListLimits.upperLimit),
                currentShownList: data.slice(state.currentListLimits.lowerLimit, state.currentListLimits.upperLimit)
            };
        default:
            return state;
    }
}
