export interface ICommonData {
    techSkills: TechSkill[]
}

export interface TechSkill {
    icon: string,
    name: string,
    type: string,
    projects: string[],
    experienceDuration: string,
    confidence: number
}

export interface Recommendation {
    author: string,
    relationship: string,
    projectId: string,
    content: string,
    id: number,
    positionAtTheTime: string,
    rating: number,
    timestamp: number
}