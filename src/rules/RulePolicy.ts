import {IRuleComponent} from './IRuleComponent';
import {RuleResult} from './RuleResult';
import {RenderType} from './RenderType';
import {Severity} from './Severity';

export class RulePolicy implements IRuleComponent {
    isValid: boolean = true;
    message: string;
    name: string;
    priority: number;
    result: RuleResult;
    isDisplayable: boolean;
    renderType: RenderType = RenderType.EvaluateAllRules;
    severity: Severity = Severity.Exception;
    source: string;

    constructor(name: string, message: string, isDisplayable: boolean);
    constructor(name: string, message: string, isDisplayable: boolean = false, severity: Severity = Severity.Exception, priority: number = 0) {
        this.name = name;
        this.message = message;
        this.isDisplayable = isDisplayable;
        this.priority = priority;
        this.severity = severity;
    }

    execute(): RuleResult {
        console.log('Begin execution of RulePolicy: ' + this.name);
        return this.render();
    }

    /**
     * Each rule must implement this function and return a valid [RuleResult].
     */
    render(): RuleResult {
        throw new Error('Each concreate rule must implement this function and return a valid Result.');
    }
}
