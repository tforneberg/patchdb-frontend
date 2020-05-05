
export default class Util {

    public static getModelSelectList(strings:string[]) : Object[] {
        return strings.map(string => { return { value: string, text: string }});
    }

    public static getStringValuesFromEnum(enumType:any) : string[] {
        let result = [];
        for (let val in enumType) {
            if (isNaN(Number(val))) {
                result.push(val);
            }
        }
        return result;
    }
}