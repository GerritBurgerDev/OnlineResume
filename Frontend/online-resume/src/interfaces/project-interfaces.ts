export interface IProject {
    name: string,
    employer: string,
    position: string,
    startDate: number,
    endDate: number,
    responsibilities: string[],
    stack: string[]
}

export interface IRecommendation {
    id?: number,
    author: string,
    relationship: string,
    content: string,
    rating: number,
    timestamp: number,
    project: string,
}