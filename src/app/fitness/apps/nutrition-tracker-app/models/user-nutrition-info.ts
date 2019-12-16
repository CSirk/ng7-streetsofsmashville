import { DomNutrient } from './dom-nutrient';
import { DomNutritionGoal } from './dom-nutrition-goal';
import { DomUserFitnessProfile } from './dom-user-fitness-profile';
import { RecordCollection } from './record-collection';
import { NutrientProgressRecord } from './nutrient-progess-record';

export class UserNutritionInfo {
    UserProfile: DomUserFitnessProfile;
    NutrientProgressRecords: NutrientProgressRecord[];
    UserDailyNutritionGoal: DomNutritionGoal;
    RecommendedNutritionGoal: DomNutritionGoal;
    RecordCollection: RecordCollection;
    BaseNutrients: DomNutrient[];
}