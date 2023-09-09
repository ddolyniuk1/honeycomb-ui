class Honeycomb {
    
}

class Edge {
    private _ExpectedType: EDataType;
    private _DefaultValue: string;

    constructor(ExpectedType: EDataType, DefaultValue: string) {
        this._ExpectedType = ExpectedType;
        this._DefaultValue = DefaultValue;
    }

    public get ExpectedType(): EDataType {
        return this._ExpectedType;
    }

    public set ExpectedType(value: EDataType) {
        this._ExpectedType = value;
    }

    public get DefaultValue(): string {
        return this._DefaultValue;
    }

    public set DefaultValue(value: string) {
        this._DefaultValue = value;
    }
}

enum EDataType {
    Number,
    Text,
    Collection,
    Map,
    Execution,
    Boolean,
    Any
}
