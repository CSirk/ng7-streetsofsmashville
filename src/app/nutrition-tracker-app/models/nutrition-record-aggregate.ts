import { NutritionRecord } from './nutrition-record';

export class NutritionRecordAggregate
{
    BaseNutritionRecord: NutritionRecord;
    UserNutritionRecords: NutritionRecord[];
    SavedUserNutritionRecords: NutritionRecord[];
    SavedGlobalNutritionRecords: NutritionRecord[];
}