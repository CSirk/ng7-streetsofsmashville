import { BasicNutrient } from './basic-nutrient';

export class DomNutritionGoal {
    Id: number;
    UserId: string;
    GoalType: string;
    Nutrients: BasicNutrient[];
}