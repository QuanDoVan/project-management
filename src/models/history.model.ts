import { UserStory } from './userstory.model';
import { User } from 'src/models/user.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { WorkItem } from './workitem.model';

@Table({timestamps: true})
export class History extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id: number;

    @AllowNull(false)
    @Column
    status: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    user_id: number;

    @ForeignKey(() => UserStory)
    @AllowNull(true)
    @Column
    userstory_id: number;

    @ForeignKey(() => WorkItem)
    @AllowNull(true)
    @Column
    workitem_id: number;

    @CreatedAt
    @Column
    created_at: Date

    @UpdatedAt
    @Column
    updated_at: Date

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => UserStory)
    userstory: UserStory

    @BelongsTo(() => WorkItem)
    workitem: WorkItem
}