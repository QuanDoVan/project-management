import { History } from 'src/models/history.model';
import { Project } from 'src/models/project.model';
import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, HasMany, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';

@Table({timestamps: true})
export class Dashboard extends Model {
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
    description: string;

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column
    project_id: number

    @CreatedAt
    @AllowNull(true)
    @Column
    date_created: Date;

    @UpdatedAt
    @AllowNull(true)
    @Column
    date_updated: Date;

    @BelongsTo(() => Project)
    project: Project
}