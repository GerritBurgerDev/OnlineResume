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
    authorId: string,
    authorAvatar?: string,
    relationship: string,
    content: string,
    rating: number,
    timestamp: number,
    projectId: number,
    positionAtTheTime: string,
    state: string
}