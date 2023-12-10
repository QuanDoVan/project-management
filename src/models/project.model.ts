import { BackLog } from './backlog.model';
import { Wiki } from './wiki.model';
import { Dashboard } from './dashboard.model';
import { Organization } from 'src/models/organization.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from './user.model';
import { TeamProject } from './teamproject.model';
import { UserStory } from './userstory.model';
import { Sprint } from './sprint.model';
import { Calendar } from './calendar.model';

@Table({timestamps: true, underscored: true})
export class Project extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(true)
    @Column
    description: string;

    @CreatedAt
    @AllowNull(true)
    @Column
    date_created: Date

    @UpdatedAt
    @AllowNull(true)
    @Column
    date_updated: Date

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    owner_id: number;

    @ForeignKey(() => Organization)
    @AllowNull(false)
    @Column
    organization_id: number

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Organization)
    organization: Organization

    @HasMany(() => TeamProject)
    teamprojects: TeamProject[]

    @HasMany(() => Dashboard)
    dashboards: Dashboard[]

    @HasMany(() => Wiki)
    wikis: Wiki[]

    @HasMany(() => BackLog)
    backlogs: BackLog[]

    @HasMany(() => UserStory)
    userstories: UserStory[]

    @HasMany(() => Sprint)
    sprints: Sprint[]

    @HasMany(() => Calendar)
    calendars: Calendar[]

    // @BelongsToMany(() => User, () => TeamProject)
    // users: User[]
}