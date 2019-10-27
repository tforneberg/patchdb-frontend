
export default class Util {

    public static getStringValuesFromEnum<E>(enumType:any) : string[] {
        let result = [];
        for (let val in enumType) {
            if (isNaN(Number(val))) {
                result.push(val);
            }
        }
        return result;
    }
}