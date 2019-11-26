export interface Exercise {
    id: string;
    name: string;
    duration: number; 
    calories: number;
    date?: Date; // ? means this attribute is optional
    state?:'completed'|'cancelled'|null; 
}