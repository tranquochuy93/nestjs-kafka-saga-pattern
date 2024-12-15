export type UpdateStockMessage = {
  products: [
    {
      id: string;
      quantity: number;
    },
  ];
};
