
export default class EnvHelper {
    static getBoolean(value?: string) {
        if (!value) return false;

        return !!RegExp('true').test(value)
    }
}