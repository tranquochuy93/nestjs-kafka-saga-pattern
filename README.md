# NestJS Kafka Saga Pattern
## Orchestration Approach
### Implementation
The order management saga be can summed up in the following steps:

1. Order Placement: The Order Service receives a request to create a new order, including details such as the list of products, quantities, customer information, and shipping details.
2. Inventory Check: The Order Service communicates with the Inventory Service to check if the requested products are in stock. If there is sufficient inventory, the order can proceed; otherwise, the order is rejected.
3. Payment Authorization: Once the order is confirmed, the Order Service contacts the Payment Service to authorize the payment. This step ensures that the customer has sufficient funds or credit to cover the order amount.
4. Order Fulfillment: If payment is authorized, the Order Service updates the order status to “confirmed” and triggers any necessary processes for order fulfillment, such as packaging and shipping.
5. Inventory Update:The Inventory Service updates the stock levels based on the products included in the order.


#### Run Project 
```bash
docker compose up -d
```
#### Product data
```ts
 private products: Product[] = [
    new Product(
      {
        name: 'Laptop',
        price: 999.99,
        quantity: 1,
      },
      'P001',
    ),
    new Product(
      {
        name: 'Smartphone',
        price: 599.99,
        quantity: 100,
      },
      'P002',
    ),
    new Product(
      {
        name: 'Wireless Headphones',
        price: 89.99,
        quantity: 75,
      },
      'P003',
    ),
    new Product(
      {
        name: 'Smartwatch',
        price: 129.99,
        quantity: 30,
      },
      'P004',
    ),
    new Product(
      {
        name: '4K Smart TV',
        price: 799.99,
        quantity: 20,
      },
      'P005',
    ),
    new Product(
      {
        name: 'Gaming Console',
        price: 299.99,
        quantity: 40,
      },
      'P006',
    ),
    new Product(
      {
        name: 'Coffee Maker',
        price: 49.99,
        quantity: 60,
      },
      'P007',
    ),
    new Product(
      {
        name: 'Bluetooth Speaker',
        price: 69.99,
        quantity: 80,
      },
      'P008',
    ),
    new Product(
      {
        name: 'Digital Camera',
        price: 449.99,
        quantity: 25,
      },
      'P009',
    ),
    new Product(
      {
        name: 'Fitness Tracker',
        price: 79.99,
        quantity: 55,
      },
      'P010',
    ),
  ];
```
#### Request to create the order successfully
```bash
curl -X 'POST' \
  'http://localhost:3000/orders' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "customerId": "CUS_0001",
  "orderItems": [
    {
      "productId": "P001",
      "quantity": 1,
      "totalPrice": 999.99
    }
  ]
}'
```

#### Request to create the order failure
```bash
curl -X 'POST' \
  'http://localhost:3000/orders' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "customerId": "CUS_0001",
  "orderItems": [
    {
      "productId": "P001",
      "quantity": 1,
      "totalPrice": 999.99
    }
  ]
}'
```

