function getTimeout(seconds: number): number {
  return seconds * 1000;  // Hint: look at the return type
}

const config = { baseURL: "https://staging.example.com" };
console.log(config.baseURL

);  // Hint: case matters


function printName(name: undefined) {
  console.log(name);
}
const userName: string | undefined = undefined;
printName(userName);  // Hint: what if userName is undefined?


type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

const product1: Product = {
  name: "Laptop",
  price: 999.99,
  inStock: true,
};

const product2: Product = {
  name: "Headphones",
  price: 49.99,
  inStock: false,
};

function formatPrice(price: number): string {
  return `$${price}`;
}

console.log(formatPrice(product1.price)); // "$999.99"
console.log(formatPrice(product2.price)); // "$49.99"