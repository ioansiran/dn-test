export default class Helper {
    static checkSelectedOrUnselectedAll(data, lowerLimit = 0, upperLimit) {
        data = data.slice(lowerLimit, upperLimit);
        if (data.every(i => i.checked))
            return {deselectedAll: false, selectedAll: true, someChecked: false};
        else if (data.every(i => !i.checked))
            return {deselectedAll: true, selectedAll: false, someChecked: false};
        else
            return {deselectedAll: false, selectedAll: true, someChecked: true};
    }
}