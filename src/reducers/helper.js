export default class Helper {
    static checkSelectedOrUnselectedAll(data, lowerLimit = 0, upperLimit) {
        let selectedAll = true, selectedSome = false, selectedItemsCount = 0;
        for (let i = 0; i < upperLimit; i++) {
            data[i].checked = data[i].checked === undefined ? false : data[i].checked;
            if (data[i].checked === true) {
                selectedSome = true;
                selectedItemsCount++;
            }
            if (!data[i].checked)
                selectedAll = false
        }
        for (let i = upperLimit ; i < data.length; i++)
            selectedItemsCount = (data[i].checked === true) ? selectedItemsCount + 1 : selectedItemsCount;
        selectedSome = selectedAll ? false : selectedSome;
        return {selectedAll, selectedSome, selectedItemsCount}
    }/*
    static checkSelectedOrUnselectedAll(data, lowerLimit = 0, upperLimit) {
        data = data.slice(lowerLimit, upperLimit);
        if (data.every(i => i.checked))
            return {deselectedAll: false, selectedAll: true, someChecked: false};
        else if (data.every(i => !i.checked))
            return {deselectedAll: true, selectedAll: false, someChecked: false};
        else
            return {deselectedAll: false, selectedAll: true, someChecked: true};
    }*/
}

// IMPORTANT - SWITCH TO SINGLE LOOP and check truth frequency