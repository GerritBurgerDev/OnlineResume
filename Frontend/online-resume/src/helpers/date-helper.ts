import moment from "moment";

export const unixToDate = (unix: number): Date => new Date(unix * 1000);

const diffInMonths = (end: Date, start: Date) => {
    const timeDiff = Math.abs(end.getTime() - start.getTime());

    return Math.floor(timeDiff / (2e3 * 3600 * 365.25));
}

export const getTimePassed = (start: number, end: number) => {
    const startDate = unixToDate(start);
    let endDate = unixToDate(end);

    if (end === 9999999999) {
        endDate = unixToDate(moment().unix());
    }

    const totalMonths = diffInMonths(endDate, startDate);

    return {
        'months': (totalMonths % 12),
        'years': Math.floor(totalMonths / 12),
    }
}