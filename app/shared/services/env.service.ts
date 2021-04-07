import { Injectable } from "@angular/core";

declare var process: any;

@Injectable()
export class EnvironmentManagerService {
    getAppKey(): string {
        return this.getEnvironmentVars("appKey");
    }

    getAppSecret(): string {
        return this.getEnvironmentVars("appSecret");
    }

    private getEnvironmentVars(key: string): string {
        if (typeof process.env !== "undefined" && process.env) {
            return process.env[key];
        } else {
            return "";
        }
    }
}
