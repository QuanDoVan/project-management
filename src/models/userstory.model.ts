import { Project } from 'src/models/project.model';
import { BackLog } from './backlog.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { WorkItem } from './workitem.model';
import { History } from './history.model';
import { Sprint } from './sprint.model';

@Table({timestamps: true})
export class UserStory extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id: number;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
    status: string;

    @AllowNull(true)
    @Column
    area: string;

    @AllowNull(true)
    @Column
    reason: string;

    @AllowNull(true)
    @Column
    description: string;

    @AllowNull(false)
    @Column
    priority: string;

    @AllowNull(true)
    @Column
    activity: string;

    @AllowNull(false)
    @Column
    type: string;

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column
    project_id: number;

    @ForeignKey(() => BackLog)
    @AllowNull(true)
    @Column
    backlog_id: number;

    @ForeignKey(() => Sprint)
    @AllowNull(true)
    @Column
    sprint_id: number;

    @CreatedAt
    @Column
    created_at: Date

    @UpdatedAt
    @Column
    updated_at: Date

    @BelongsTo(() => Project)
    project: Project

    @BelongsTo(() => BackLog)
    backlog: BackLog

    @BelongsTo(() => Sprint)
    sprint: Sprint

    @HasMany(() => WorkItem)
    WorkItems: WorkItem[]

    @HasMany(() => History)
    histories: History[]
}