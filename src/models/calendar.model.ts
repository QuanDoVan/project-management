import { User } from 'src/models/user.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, BelongsTo, ForeignKey, CreatedAt, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { WorkItem } from './workitem.model';
import { Project } from './project.model';

@Table({timestamps: true})
export class Calendar extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id: number;

    @AllowNull(false)
    @Column
    used_time: string;

    @AllowNull(false)
    @Column
    time: string;

    @AllowNull(false)
    @Column
    worktype: string;

    @AllowNull(true)
    @Column
    note: string;

    @ForeignKey(() => WorkItem)
    @AllowNull(false)
    @Column
    workitem_id: number

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    user_id: number

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column
    project_id: number

    @CreatedAt
    @Column
    created_at: Date;

    @UpdatedAt
    @Column
    updated_at: Date;

    @BelongsTo(() => User)
    user: User
    
    @BelongsTo(() => WorkItem)
    workitem: WorkItem

    @BelongsTo(() => Project)
    project: Project
}