import { TeamWork } from './teamwork.model';
import { Table, Column, Model, PrimaryKey, ForeignKey, AutoIncrement, AllowNull, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Role } from './role.model';
import { Wiki } from './wiki.model';
import { TeamProject } from './teamproject.model';
import { Project } from './project.model';
import { WorkItem } from './workitem.model';
import { History } from './history.model';
import { File } from './file.model';
import { Calendar } from './calendar.model';

@Table({timestamps: false})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id: number

    @AllowNull(false)
    @Column
    full_name: string;

    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    country: string;

    @AllowNull(true)
    @Column
    avatar: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    phone: string;

    @AllowNull(true)
    @Column
    gender: string;

    @AllowNull(true)
    @Column
    address: string;

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Column
    role_id: number;

    @BelongsTo(() => Role)
    role: Role;

    @HasMany(() => Project)
    projects: Project[]

    @HasMany(() => Wiki)
    wikis: Wiki[]

    @HasMany(() => TeamProject)
    teamprojects: TeamProject[]

    @HasMany(() => History)
    histories: History[]

    @HasMany(() => File)
    files: File[]

    @HasMany(() => Calendar)
    calendars: Calendar[]

    @HasMany(() => TeamWork)
    teamworks: TeamWork[]


    @BelongsToMany(() => Project, () => TeamProject)
    _projects: Project[]

    @BelongsToMany(() => WorkItem, () => TeamWork)
    workitems: WorkItem[];
}