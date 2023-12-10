import { Calendar } from './../models/calendar.model';
import { WorkItem } from './../models/workitem.model';
import { UserStory } from './../models/userstory.model';
import { Comment } from './../models/comment.model';
import { SubWiki } from './../models/subwiki.model';
import { Wiki } from './../models/wiki.model';
import { Dashboard } from './../models/dashboard.model';
import { TeamProject } from './../models/teamproject.model';
import { Project } from './../models/project.model';
import { Sequelize } from 'sequelize-typescript';
import { Organization } from 'src/models/organization.model';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { BackLog } from 'src/models/backlog.model';
import { History } from 'src/models/history.model';
import { Sprint } from 'src/models/sprint.model';
import { File } from 'src/models/file.model';
import { TeamWork } from 'src/models/teamwork.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'ProjectAndResourceManagement',
        password: 'ABCabc123456!',
        database: 'project_and_resource_management'
      });
      sequelize.addModels([
        Role, 
        User, 
        Organization, 
        Project, 
        TeamProject, 
        Dashboard, 
        Wiki, 
        SubWiki,
        Comment,
        BackLog,
        UserStory,
        WorkItem,
        History,
        Sprint,
        Calendar,
        File,
        TeamWork
      ]); 
      await sequelize.sync();
      return sequelize;
    },
  },
];