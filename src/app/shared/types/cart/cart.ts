export interface CartDetail{
    idArticle: number;
    name: string;
    quantityRequest: number;
    quantityAvailable: number;
    unitPrice: number;
    subPrice: number;
    message: string;
}

export interface CartDetailResponse{    
    cartDetail: CartDetail[];
    totalPrice: number;
    totalItems: number;
}