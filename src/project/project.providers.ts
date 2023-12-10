import { Project } from './../models/project.model';

export const ProjectProviders = [
    {
        provide: 'PROJECT_REPOSITORY',
        useValue: Project
    }
]