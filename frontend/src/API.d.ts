export declare type DataInput = {
    zipcode: string;
    year: string;
};
export declare type DataOutput = {
    __typename: "DataOutput";
    date?: string | null;
    temp?: string | null;
};
export declare type GetAllQueryVariables = {
    input?: DataInput | null;
};
export declare type GetAllQuery = {
    getAll?: Array<{
        __typename: "DataOutput";
        date?: string | null;
        temp?: string | null;
    } | null> | null;
};
export declare type GetCurrentQueryVariables = {
    zipcode?: string | null;
};
export declare type GetCurrentQuery = {
    getCurrent: string;
};
