import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';
import { Role } from 'src/models/role.model';
import { Table, Column, Model, CreatedAt, UpdatedAt, AllowNull, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({timestamps: true})
export class TeamProject extends Model {
    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column
    project_id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    user_id: number;

    @CreatedAt
    @AllowNull(true)
    @Column
    date_created: Date

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Column
    role_id: number;

    @UpdatedAt
    @AllowNull(true)
    @Column
    date_updated: Date

    @BelongsTo(() => Project)
    project: Project

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Role)
    role: Role
}