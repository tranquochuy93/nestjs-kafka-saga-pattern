export type CheckProductsAvailabilityMessage = {
  products: [
    {
      id: string;
      quantity: number;
    },
  ];
};
