import { Dashboard } from './../models/dashboard.model';

export const DashboardProviders = [
    {
        provide: 'DASHBOARD_REPOSITORY',
        useValue: Dashboard
    }
]