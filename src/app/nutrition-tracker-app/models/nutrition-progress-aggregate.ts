import { NutritionRecord } from './nutrition-record';
import { Nutrient } from './nutrient';
import { NutritionGoal } from './nutrition-goal';

export class NutritionProgressAggregate {
    ProgressRecords: NutritionRecord[];
    NutritionGoal: NutritionGoal;
    NutrientProgressTotal: Nutrient[];
    NutrientProgressRemaining: Nutrient[];
}