export interface ReportBuyDto{
    id: number;
    userName: string;
    createDate: Date;
    buyDate: Date;
    totalPrice: number;
    articleDetails: ArticleDetailsDto[];
}

export interface ArticleDetailsDto{    
    articleId: number;
    name: string;
    unitPrice: number;
    quantity: number;
}