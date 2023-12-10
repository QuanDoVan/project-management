import { User } from './user.model';
import { WorkItem } from './workitem.model';
import { Table, Column, Model, CreatedAt, UpdatedAt, AllowNull, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({timestamps: true})
export class TeamWork extends Model {
    @ForeignKey(() => WorkItem)
    @AllowNull(false)
    @Column
    workitem_id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    user_id: number;

    @CreatedAt
    @AllowNull(true)
    @Column
    date_created: Date

    @UpdatedAt
    @AllowNull(true)
    @Column
    date_updated: Date

    @BelongsTo(() => WorkItem)
    workitem: WorkItem

    @BelongsTo(() => User)
    user: User
}