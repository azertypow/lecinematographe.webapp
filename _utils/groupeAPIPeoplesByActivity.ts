type Params = {
"activity": string;
"firstname": string;
"lastname": string;
};

export function groupeAPIPeoplesByActivity(data: Params[]): {[key: string]: Params[]} {
    return data.reduce<Record<string, Params[]>>((acc, item) => {
        if (!acc[item.activity]) {
            acc[item.activity] = [];
        }
        acc[item.activity].push(item);
        return acc;
    }, {});
}
