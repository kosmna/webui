export class Flow {
    nodes: number = null;
    link: string;
    constructor(public id: string, public type: string, public label: string) {
        this.link = `/flows/#flow/${id}`;
    }
}
