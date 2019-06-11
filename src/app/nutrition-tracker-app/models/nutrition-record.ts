import { Nutrient } from './nutrient';

export class NutritionRecord {
    UserId: string;
    RecordName: string;
    RecordType: string;
    Date: string;
    Nutrients: Nutrient[] 
}