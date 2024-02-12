export interface ImageId {
    id: string;
}

export interface ImageResponse {
    status: number,
    //data: any[],
    data: ImageId[],
    pages: number;
}