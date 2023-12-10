import { Sprint } from "src/models/sprint.model";

export const SprintProviders = [
    {
        provide: 'SPRINT_REPOSITORY',
        useValue: Sprint
    }
]