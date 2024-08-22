
export class Currency {
    id: number;
    currencyCode: string;
    currencyName: string;

    constructor(id: number, currencyCode: string, currencyName: string) {
        this.id = id;
        this.currencyCode = currencyCode;
        this.currencyName = currencyName;
    }

}
