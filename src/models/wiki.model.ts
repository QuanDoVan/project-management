import { SubWiki } from './subwiki.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { User } from './user.model';
import { Project } from './project.model';

@Table({timestamps: true})
export class Wiki extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id: number;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(true)
    @Column
    description: string;

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column
    project_id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    user_id: number

    @CreatedAt
    @Column
    created_at: Date

    @UpdatedAt
    @Column
    updated_at: Date

    @BelongsTo(() => Project)
    project: Project

    @BelongsTo(() => User)
    users: User

    @HasMany(() => SubWiki)
    subwiki: SubWiki[]
}