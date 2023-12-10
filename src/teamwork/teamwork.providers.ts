import { TeamWork } from './../models/teamwork.model';

export const TeamWorkProviders = [
    {
        provide: 'TEAMWORK_REPOSITORY',
        useValue: TeamWork
    }
]