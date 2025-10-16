export const normalizeUrl = (value: string) => {
    if (!value) return "";

    try {
        const withScheme = /^(https?:)?\/\//i.test(value) ? value : `https://${value}`;
        const u = new URL(withScheme);
        return u.href;
    } catch {
        return "";
    }
};
export const isSafeUrl = (value: string) => {
    try {
        const u = new URL(/^(https?:)?\/\//i.test(value) ? value : `https://${value}`);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
};
