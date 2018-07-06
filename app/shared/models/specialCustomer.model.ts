import { Activity } from "~/shared/models/activity.model";

export class SpecialCustomer {
    id: string;
    customer: string;
    programType: string;
    activityIds: Array<string> | any;
    possibleActivities: Array<Activity>;
    possibleActivitiesFull: Array<any>;
}
