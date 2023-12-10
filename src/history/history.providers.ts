import { History } from "src/models/history.model";

export const HistoryProviders = [
    {
        provide: 'HISTORY_REPOSITORY',
        useValue: History
    }
]