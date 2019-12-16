import { DomNutrient } from './dom-nutrient';

export class DomNutritionRecord {
    Id: number;
    UserId: string;
    RecordType: string;
    Date: string;
    RecordName: string;
    NutrientRecordId: number;
    Nutrients: DomNutrient[];
}