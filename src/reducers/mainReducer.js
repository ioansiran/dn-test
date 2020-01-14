import data from "../mockDataProvider.js";
import { searchList } from "../actions/mainActions.js";
const initialState = {
    currentShownList:[], // contains the list that's currently displayed
    selectedItemIndexes:[], // array of indexes of selected items from the main data source (improved performance for not searching)
    searchQuery: '', // search query string
    searching : false // flag for showing search results 
};

export default function mainReducer(state = initialState, action){
    
    let dataToDisplay, searchResults;
    switch (action.type) {
        case "GET_LIST":
            if(state.searching) {
                searchResults = data.filter(item => {
                    return JSON.stringify(item).toLowerCase().includes(state.searchQuery.toLowerCase())
                }); 
                dataToDisplay = searchResults;
            }
            else {
                dataToDisplay = data;
            }
            return {
                ...state,
                currentListLimits: action.data,
                currentShownList: dataToDisplay.slice(action.data.lowerLimit, action.data.upperLimit)
            }
        case "SELECT_ITEM":
            return {
                ...state,
                selectedItemIndexes: [...state.selectedItemIndexes, action.data]
            }
        case "DESELECT_ITEM":
            return {
                ...state,
                selectedItemIndexes: state.selectedItemIndexes.filter(item => item !== action.data)
            }
        case "DELETE_ITEMS":
            return {
                ...state, 
                currentShownList: []            
            }
        case "SEARCH_ITEM":            
                searchResults = data.filter(item => {
                    return JSON.stringify(item).toLowerCase().includes(action.data.toLowerCase())
                });               
                return {
                    ...state,
                    searching : true,
                    searchQuery: action.data,
                    currentShownList:searchResults.slice(state.currentListLimits.lowerLimit,state.currentListLimits.upperLimit) 
                }
        case "CLEAR_SEARCH":     
                return {
                    ...state,
                    searching : false,
                    searchQuery: '',
                    currentShownList:data.slice(state.currentListLimits.lowerLimit,state.currentListLimits.upperLimit) 
                }
        default:
            return state;
    }
}
