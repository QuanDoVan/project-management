import { UserStory } from './userstory.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Project } from './project.model';

@Table({timestamps: false})
export class BackLog extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column
    project_id: number;

    @HasMany(() => UserStory)
    userstories: UserStory[]

    @BelongsTo(() => Project)
    project: Project

}