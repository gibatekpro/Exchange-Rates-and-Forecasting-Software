export interface ConversionApiResponse {
    success: boolean;
    query: Query;
    info: Info;
    date: string;
    historical: boolean;
    result: number;
}

interface Query {
    from: string;
    to: string;
    amount: number;
}

interface Info {
    timestamp: number;
    rate: number;
}
