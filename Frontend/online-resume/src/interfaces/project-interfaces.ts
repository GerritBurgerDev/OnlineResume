export interface IProject {
    id: number,
    name: string,
    employer: string,
    position: string,
    startDate: number,
    endDate: number,
    responsibilities: string[],
    stack: string[],
    recommendations: IRecommendation[]
}

export interface IRecommendation {
    id?: number,
    author: string,
    relationship: string,
    content: string,
    rating: number,
    timestamp: number,
    projectId: number,
}