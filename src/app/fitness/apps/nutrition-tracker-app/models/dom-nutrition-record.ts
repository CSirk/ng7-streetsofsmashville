import { BasicNutrient } from './basic-nutrient';

export class DomNutritionRecord {
    Id: number;
    UserId: string;
    Date: string;
    RecordType: string;
    RecordName: string;
    Nutrients: BasicNutrient[];
}