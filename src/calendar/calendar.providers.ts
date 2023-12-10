import { Calendar } from './../models/calendar.model';

export const CalendarProviders = [
    {
        provide: 'CALENDAR_REPOSITORY',
        useValue: Calendar
    }
]