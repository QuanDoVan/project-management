import { Error, Success } from "./constant"

export const sendSuccess = (dto: Success): any => {
    return {
        status: true,
        code: dto.code || 200,
        message: dto.message || "Sucess",
        data: dto.data
    }
}

export const sendError = (dto: Error): any => {
    return {
        status: false,
        code: dto.code,
        message: dto.message || 'Fail',
    }
}

export const response = {
    ORGANIZATION_FOUND: "Organization found",
    PROJECT_FOUND: 'Project found',
    SUBWWIKI_FOUND: 'Sub wiki found',
    TEAM_MEMBER_FOUND: 'Team members already exist',
    USER_FOUND: 'User found',
    WIKI_FOUND: 'Wiki found',
    DASHBOARD_FOUND: 'Dashboard found',
    BACKLOG_FOUND: 'Backlog found',
    USER_STORY_FOUND: 'User story found',
    WORK_ITEM_FOUND: 'Work item found',
    SPRINT_FOUND: 'Sprint found',
    CALENDAR_FOUND: 'Calendar found',

    USER_NOT_FOUND: 'User not found',
    COMMENT_NOT_FOUND: 'Comment not found',
    WIKI_NOT_FOUND: 'Wiki not found',
    SUBWIKI_NOT_FOUND: 'Sub wiki not found',
    ORGANIZATION_NOT_FOUND: 'Organization not found',
    PROJECT_NOT_FOUND: 'Project not found',
    EMAIL_PHONE_FOUND: 'Email or phone number already exists',
    IMAGE_NOT_FOUND: 'Image not found',
    FILE_NOT_FOUND: 'File not found',
    DASHBOARD_NOT_FOUND: 'Dashboard not found',
    BACKLOG_NOT_FOUND: 'Backlog not found',
    USER_STORY_NOT_FOUND: 'User story not found',
    WORK_ITEM_NOT_FOUND: 'Work item not found',
    SPRINT_NOT_FOUND: 'Sprint not found',
    CALENDAR_NOT_FOUND: 'Calendar not found',

    PASSWORD_MISMATCH: 'Password mismatch',
    PASSWORD_INCORRECT: 'Incorrect password',
    CURRENT_PASSWORD_INCORRECT: 'The current password is incorrect',
    FILTER_NOT_FOUND: 'No results were found',
    TEAMWORK_NOT_FOUND: 'Teamwork or user not found',

    ADD_USER_SUCCESS: 'User added successfully',
    ADD_SPRINTS_SUCCESS: 'Sprints added successfully',

    EDIT_USER_SUCCESS: "User edited successfully",
    EDIT_PASSWORD_SUCCESS: "Password updated successfully",    
    EDIT_COMMENT_SUCCESS: "Comment edited successfully",
    EDIT_PROJECT_SUCCESS: "Project edited successfully",
    EDIT_SUBWIKI_SUCCESS: "Subwiki edited successfully",
    EDIT_WIKI_SUCCESS: "Wiki updated successfully",
    EDIT_DASHBOARD_SUCCESS: "Dashboard updated successfully",
    EDIT_BACKLOG_SUCCESS: "Backlog edited successfully",
    EDIT_USERSTORY_SUCCESS: 'User Story edited successfully',
    EDIT_WORKITEM_SUCCESS: 'Work item edited successfully',

    DELETE_USER_SUCCESS:  "User deleted successfully",
    DELETE_COMMENT_SUCCESS: "Comment deleted successfully",
    DELETE_PROJECT_SUCCESS: "Project deleted successfully",
    DELETE_SUBWIKI_SUCCESS: "Subwiki deleted sucessfully",
    DELETE_WIKI_SUCCESS: "Wiki deleted successfully",
    DELETE_DASHBOARD_SUCCESS: "Dashboard deleted successfully",
    DELETE_BACKLOG_SUCCESS: "Backlog deleted successfully",
    DELETE_USERSTORY_SUCCESS: 'User Story deleted successfully',
    DELETE_WORKITEM_SUCCESS: 'Work item deleted successfully',
    DELETE_TEAMWORK_SUCCESS: 'Teamwork deleted successfully',
    DELETE_CALENDAR_SUCCESS: 'Calendar deleted successfully',

    UPLOAD_AVATAR_SUCCESS: "Profile picture updated successfully",
    UPDATE_CALENDAR_SUCCESS: 'Calendar updated successfully'
}