import { SubWiki } from './../models/subwiki.model';

export const SubWikiProviders = [
    {
        provide: 'SUBWIKI_REPOSITORY',
        useValue: SubWiki
    }
]