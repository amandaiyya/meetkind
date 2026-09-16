import { RankedVenue } from "./venue";

export type HistoryCardPlan = {
    _id: string;
    userId: string;
    category: string;
    participants: number;
    venues: number;
    createdAt: string;
};

export type PlanProps = {
    _id: string | undefined;
    userId: string;
    venues: RankedVenue[];
    category: string;
};