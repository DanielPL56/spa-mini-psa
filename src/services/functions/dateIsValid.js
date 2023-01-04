import { getActualDate } from "./getActualDate";

export const dateIsValid = (chosenDate) => {
    const actualDate = getActualDate();
    
    if (chosenDate > actualDate) return false;
    else return true;
}