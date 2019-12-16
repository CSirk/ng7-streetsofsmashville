import { DomNutrient } from './dom-nutrient';

export class DomNutritionGoal {
    Id: number;
    UserId: string;
    GoalType: string;
    NutrientRecordId: number;
    Nutrients: DomNutrient[];
}