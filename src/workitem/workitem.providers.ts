import { WorkItem } from './../models/workitem.model';

export const WorkItemProviders = [
    {
        provide: 'WORKITEM_REPOSITORY',
        useValue: WorkItem
    }
]