import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { User } from './user.model';
import { SubWiki } from './subwiki.model';
import { Wiki } from './wiki.model';
import { WorkItem } from './workitem.model';

@Table({timestamps: true})
export class Comment extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id: number;

    @AllowNull(false)
    @Column
    content: string;

    @ForeignKey(() => Wiki)
    @AllowNull(true)
    @Column
    wiki_id: number;

    @ForeignKey(() => SubWiki)
    @AllowNull(true)
    @Column
    subwiki_id: number;

    @ForeignKey(() => WorkItem)
    @AllowNull(true)
    @Column
    workitem_id: number;

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

    @BelongsTo(() => SubWiki)
    subwiki: SubWiki

    @BelongsTo(() => WorkItem)
    workitem: WorkItem
}