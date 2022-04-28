export interface CardData {
    id: number;
    name: string;
    description: string;
    state: 'default' | 'flipped' | 'matched';
}