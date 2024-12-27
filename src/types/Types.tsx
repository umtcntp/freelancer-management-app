export interface CardInitialState {
    cards: cardType[]
}

export interface cardType {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string;
    finishedJobCount: number;
    city: string;
    address?: {
        city: string;
    };
}