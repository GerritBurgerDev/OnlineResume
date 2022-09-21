import {TechSkill} from "@/interfaces/global-interfaces";

export const SKILL_GO = 'go';
export const SKILL_PHP = 'php';
export const SKILL_VUE = 'vue';
export const SKILL_ANGULAR = 'angular';
export const SKILL_REACT = 'react';
export const SKILL_SQL = 'mysql';
export const SKILL_MONGODB = 'mongodb';
export const SKILL_AWS = 'aws';

export const SELECTED_SKILL_ALL: TechSkill = {
    icon: "",
    name: "All",
    type: "",
    projects: [],
    experienceDuration: '',
    confidence: 0
}

export const ALL_SKILLS: {
    [key: string]: TechSkill
} = {
    [SKILL_GO]: {
        "icon": "go",
        "name": "Go",
        "type": "Backend",
        "projects": ["OnlineResume", "Andile Project"],
        "experienceDuration": "1 Month",
        "confidence": 0
    },
    [SKILL_PHP]: {
        "icon": "php",
        "name": "PhP",
        "type": "Backend",
        "projects": ["Activate", "Walmart Creator Portal"],
        "experienceDuration": "8 Months",
        "confidence": 0
    },
    [SKILL_VUE]: {
        "icon": "vue",
        "name": "Vue",
        "type": "Frontend",
        "projects": ["InteractiveScienceYearbook", "Walmart Creator Portal"],
        "experienceDuration": "1 Year 6 Months",
        "confidence": 0
    },
    [SKILL_ANGULAR]: {
        "icon": "angular",
        "name": "Angular",
        "type": "Frontend",
        "projects": ["WinWeb", "International Online Admin"],
        "experienceDuration": "1 Year",
        "confidence": 0
    },
    [SKILL_REACT]: {
        "icon": "react",
        "name": "React",
        "type": "Frontend",
        "projects": ["Activate", "OnlineResume"],
        "experienceDuration": "8 Months",
        "confidence": 0
    },
    [SKILL_SQL]: {
        "icon": "mysql",
        "name": "SQL",
        "type": "Database",
        "projects": ["Activate", "Walmart Creator Portal"],
        "experienceDuration": "8 Months",
        "confidence": 0
    },
    [SKILL_MONGODB]: {
        "icon": "mongodb",
        "name": "MongoDB",
        "type": "Database",
        "projects": ["OnlineResume", "Andile Project"],
        "experienceDuration": "1 Month",
        "confidence": 0
    },
    [SKILL_AWS]: {
        "icon": "aws",
        "name": "AWS",
        "type": "Web Service",
        "projects": ["OnlineResume", "Andile Project"],
        "experienceDuration": "1 Month",
        "confidence": 0
    },
}