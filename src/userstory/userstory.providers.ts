import { UserStory } from "src/models/userstory.model";

export const UserStoryProviders = [
    {
        provide: 'USERSTORY_REPOSITORY',
        useValue: UserStory
    }
]