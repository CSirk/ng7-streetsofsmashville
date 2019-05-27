import { NutritionRecord } from './nutrition-record';

export class NutritionRecordAggregate
{
    UserNutritionRecords: NutritionRecord[];
    SavedUserNutritionRecords: NutritionRecord[];
    SavedGlobalNutritionRecords: NutritionRecord[];
}