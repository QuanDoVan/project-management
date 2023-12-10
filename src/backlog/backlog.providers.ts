import { BackLog } from './../models/backlog.model';

export const BackLogProviders = [
    {
        provide: 'BACKLOG_REPOSITORY',
        useValue: BackLog
    }
]