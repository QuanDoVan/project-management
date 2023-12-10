import { Organization } from 'src/models/organization.model';

export const OrganizationProviders = [
    {
        provide: 'ORGANIZATION_REPOSITORY',
        useValue: Organization
    }
]