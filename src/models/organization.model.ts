import { Project } from './project.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany } from 'sequelize-typescript';

@Table({timestamps: false})
export class Organization extends Model {
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
    host: string;

    @HasMany(() => Project)
    projects: Project[]
}