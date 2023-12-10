import { User } from 'src/models/user.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { UserStory } from './userstory.model';
import { History } from './history.model';
import { Calendar } from './calendar.model';
import { Comment } from './comment.model';
import { File } from './file.model';
import { TeamWork } from './teamwork.model';

@Table({timestamps: true})
export class WorkItem extends Model {
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

    @ForeignKey(() => UserStory)
    @AllowNull(false)
    @Column
    userstory_id: number;

    @CreatedAt
    @Column
    created_at: Date

    @UpdatedAt
    @Column
    updated_at: Date

    @BelongsTo(() => UserStory)
    userstory: UserStory

    @HasMany(() => History)
    histories: History[]

    @HasMany(() => Comment)
    comments: Comment[]

    @HasMany(() => File)
    files: File[]

    @HasMany(() => Calendar)
    calendars: Calendar[]

    @HasMany(() => TeamWork)
    teamworks: TeamWork[]

    // @BelongsToMany(() => User, () => TeamWork)
    // users: User[];
}