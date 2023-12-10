import { Wiki } from './../models/wiki.model';

export const WikiProviders = [
    {
        provide: 'WIKI_REPOSITORY',
        useValue: Wiki
    }
]