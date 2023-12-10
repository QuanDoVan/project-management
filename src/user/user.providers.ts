import { User } from 'src/models/user.model';

export const UsersProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: User
    }
]