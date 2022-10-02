import {IRecommendation} from "@/interfaces/project-interfaces";

export const RECOMMENDATION_STATE_PENDING = 'pending';
export const RECOMMENDATION_STATE_POSTED = 'posted';
export const RECOMMENDATION_STATE_REJECTED = 'rejected';

export const TEMP_RECOMMENDATIONS: IRecommendation[] = [
    {
        id: 1,
        authorId: "gerrit.burger777@gmail.com",
        author: "Tristen Paul",
        relationship: "Co-worker",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: 4.0,
        timestamp: 1663500575,
        projectId: 1,
        state: RECOMMENDATION_STATE_POSTED,
        positionAtTheTime: ""
    },
    {
        id: 2,
        authorId: "gerrit.burger777@gmail.com",
        author: "Tristen Paul",
        relationship: "Co-worker",
        content: "Gerrit is a good developer",
        rating: 3.2,
        timestamp: 1663500575,
        projectId: 1,
        state: RECOMMENDATION_STATE_PENDING,
        positionAtTheTime: ""
    },
    {
        id: 3,
        authorId: "gerrit.burger777@gmail.com",
        author: "Tristen Paul",
        relationship: "Co-worker",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        rating: 4.0,
        timestamp: 1663500575,
        projectId: 1,
        state: RECOMMENDATION_STATE_REJECTED,
        positionAtTheTime: ""
    },
    {
        id: 4,
        authorId: "gerrit.burger777@gmail.com",
        author: "Tristen Paul",
        relationship: "Co-worker",
        content: "Gerrit is a good developer",
        rating: 4.4,
        timestamp: 1663500575,
        projectId: 1,
        state: RECOMMENDATION_STATE_POSTED,
        positionAtTheTime: ""
    },
];