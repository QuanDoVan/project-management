import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from './user.model';
import { Wiki } from './wiki.model';

@Table({timestamps: true})
export class SubWiki extends Model {
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

    @ForeignKey(() => Wiki)
    @AllowNull(false)
    @Column
    wiki_id: number;

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

    @BelongsTo(() => Wiki)
    wiki: Wiki

    @BelongsTo(() => User)
    users: User
}