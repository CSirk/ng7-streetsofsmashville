import { DomNutrient } from './dom-nutrient';

export class DisplayNutritionRecord {
    Id: number;
    UserId: string;
    Date: string;
    RecordType: string;
    RecordName: string;
    Nutrients: DomNutrient[];
}