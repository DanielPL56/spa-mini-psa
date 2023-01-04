export const getActualDate = () => {
    const actualDay = new Date().getDate();
    const actualMonth = new Date().getMonth();
    const actualYear = new Date().getFullYear();

    const actualDate = new Date(actualYear, actualMonth, actualDay + 1);

    return actualDate;
}