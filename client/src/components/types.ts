export type Urls = { url: string, _id: string };

export type Content = {
    createdAt: string,
    name: string,
    updatedAt: string,
    urls: Urls[],
    _id:string
} 