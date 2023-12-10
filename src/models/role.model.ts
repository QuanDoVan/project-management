import { TeamProject } from './teamproject.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany } from 'sequelize-typescript';
import { User } from './user.model';

@Table({timestamps: false})
export class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull
    @Column
    id: number;

    @AllowNull
    @Column
    name: string;

    @AllowNull
    @Column
    description: string;

    @HasMany(() => User)
    users: User[]

    @HasMany(() => TeamProject)
    teamprojects: TeamProject[]
}