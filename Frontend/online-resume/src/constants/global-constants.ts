import {TechSkill} from "@/interfaces/global-interfaces";

export const SKILL_GO = 'Go';
export const SKILL_GO_ICON = 'go';
export const SKILL_PHP = 'PhP';
export const SKILL_PHP_ICON = 'php';
export const SKILL_VUE = 'Vue';
export const SKILL_VUE_ICON = 'vue';
export const SKILL_ANGULAR = 'Angular';
export const SKILL_ANGULAR_ICON = 'angular';
export const SKILL_REACT = 'React';
export const SKILL_REACT_ICON = 'react';
export const SKILL_SQL = 'SQL';
export const SKILL_SQL_ICON = 'mysql';
export const SKILL_MONGODB = 'MongoDB';
export const SKILL_MONGODB_ICON = 'mongodb';
export const SKILL_AWS = 'AWS';
export const SKILL_AWS_ICON = 'aws';
export const SKILL_AZURE = 'Azure';
export const SKILL_AZURE_ICON = 'azure';
export const SKILL_JAVASCRIPT = 'Javascript';
export const SKILL_JAVASCRIPT_ICON = 'javascript';
export const SKILL_CPP = 'C++';
export const SKILL_CPP_ICON = 'c++';

export const MAP_SKILL_NAME_TO_ICON: {
    [key: string]: string
} = {
    [SKILL_GO]: SKILL_GO_ICON,
    [SKILL_PHP]: SKILL_PHP_ICON,
    [SKILL_ANGULAR]: SKILL_ANGULAR_ICON,
    [SKILL_VUE]: SKILL_VUE_ICON,
    [SKILL_REACT]: SKILL_REACT_ICON,
    [SKILL_SQL]: SKILL_SQL_ICON,
    [SKILL_MONGODB]: SKILL_MONGODB_ICON,
    [SKILL_AWS]: SKILL_AWS_ICON,
    [SKILL_AZURE]: SKILL_AZURE_ICON,
    [SKILL_JAVASCRIPT]: SKILL_JAVASCRIPT_ICON,
    [SKILL_CPP]: SKILL_CPP_ICON,
}

export const MAX_TIMESTAMP = 9999999999;

export const SELECTED_SKILL_ALL: TechSkill = {
    icon: '',
    name: 'All',
    type: '',
    projects: [],
    about: '',
    experienceDuration: '',
    confidence: 0
}

export const GOOGLE_CLIENT_ID = '623967861794-7q115le8urmivuke5tik7aj5jr63h17r.apps.googleusercontent.com';

export const LOCATION = {
    home: '/',
    experience: '/experience',
    recommendations: '/recommendations'
}