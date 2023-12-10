import { TeamProject } from './../models/teamproject.model';

export const TeamProjectProviders = [
    {
        provide: 'TEAMPROJECT_REPOSITORY',
        useValue: TeamProject
    }
]