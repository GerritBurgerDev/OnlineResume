export interface ICommonData {
    techSkills: {
        [key: string]: TechSkill
    },
    currentEmployment: ICurrentEmployment
}

export interface ICurrentEmployment {
    employer: string,
    stack: string[],
    position: string,
    satisfaction: number,
    project: string,
    image: string
}

export interface TechSkill {
    icon: string,
    name: string,
    type: string,
    about: string,
    projects: string[],
    experienceDuration: string,
    confidence: number
}

export interface IProfile {
    email: string,
    imageUrl: string,
    name: string,
    accessToken: string,
    isAdmin?: boolean,
}

export interface Recommendation {
    author: string,
    relationship: string,
    projectId: string,
    content: string,
    id: number,
    positionAtTheTime: string,
    rating: number,
    timestamp: number,
    state: string
}

export interface ISelectItem {
    label: string,
    value: string
}