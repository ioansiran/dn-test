export function getList(lowerLimit, upperLimit) {
    return {
        type: "GET_LIST",
        data: {lowerLimit, upperLimit}
    }
}

export function showFormForItem(id) {
    return {
        type: "SHOW_FORM",
        data: id
    }
}
export function updateItem (newItem) {
    return {
        type: "UPDATE_ITEM",
        data: newItem
    }
}
export function selectItem (id) {
    return {
        type: "SELECT_ITEM",
        data: id
    }
}
export function deselectItem (id) {
    return {
        type: "DESELECT_ITEM",
        data: id
    }
}
export function deleteItems() {
    return {
        type: "DELETE_ITEMS"
    }
}
export function searchList (queryString) {
    return {
        type: "SEARCH_ITEM",
        data: queryString
    }
}
export function clearSearch (queryString) {
    return {
        type: "CLEAR_SEARCH"
    }
}