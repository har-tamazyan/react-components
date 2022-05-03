import {
    addDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    startOfYear,
    endOfYear,
    addYears,
} from 'date-fns';

const today = new Date();

const getLastNMonths = (n) => {
    const adjustedDate = Math.floor((today.getMonth() / n));
    const startDate = new Date(today.getFullYear(), adjustedDate * n - n, 1);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + n, 0);
    return { startDate, endDate };
};

const quarterDates = getLastNMonths(3);
const lastSixMonthDates = getLastNMonths(6);


const dateRanges = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
    startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
    startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    startOfYear: startOfYear(new Date()),
    endOfYear: endOfYear(new Date()),
    startOflastYear: startOfYear(addYears(new Date(), -1)),
    endOflastYear: endOfYear(addYears(new Date(), -1)),
    endOfLastQuarter: quarterDates.endDate,
    startOfLastQuarter: quarterDates.startDate,
    endOfLastSixMonths: lastSixMonthDates.endDate,
    startOfLastSixMonths: lastSixMonthDates.startDate,
};

export const sideBarOptions = () => {
    const customDateObjects = [
        {
            label: 'This Month',
            range: () => ({
                startDate: dateRanges.startOfMonth,
                endDate: dateRanges.endOfToday,
            }),
        },
        {
            label: 'Last Month',
            range: () => ({
                startDate: dateRanges.startOfLastMonth,
                endDate: dateRanges.endOfLastMonth,
            }),
        },
        {
            label: 'Last 90 Days',
            range: () => ({
                startDate: dateRanges.startOfLastNintyDay,
                endDate: dateRanges.endOfToday,
            }),
        },
        {
            label: 'Last Quarter',
            range: () => ({
                startDate: dateRanges.startOfLastQuarter,
                endDate: dateRanges.endOfLastQuarter,
            }),
        },
        {
            label: 'Last 6 Month',
            range: () => ({
                startDate: dateRanges.startOfLastSixMonths,
                endDate: dateRanges.endOfLastSixMonths,
            }),
        },
        {
            label: 'This Year',
            range: () => ({
                startDate: dateRanges.startOfYear,
                endDate: dateRanges.endOfToday,
            }),
        },
        {
            label: 'Last Year',
            range: () => ({
                startDate: dateRanges.startOflastYear,
                endDate: dateRanges.endOflastYear,
            }),
        },
    ];

    return customDateObjects;
};
