import express, { response } from "express";
import "dotenv/config";
import { fakeUsers } from "../constants/users.js";
import { fakeProducts } from "../constants/products.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  return response.status(200).send({
    message: "Welcome to the API",
  });
});

// get all users and products
app.get("/api/users", (request, response) => {
  const { filter, value } = request.query;
  if (!filter && !value) {
    return response.status(200).send({
      users: fakeUsers,
    });
  }

  if (!filter || !value) {
    return response.status(400).send({
      message: "Invalid filter or value",
    });
  }

  if (filter && value) {
    const filteredUsers = fakeUsers.filter((user) =>
      user[filter].includes(value)
    );

    if (!filteredUsers.length) {
      return response.status(404).send({
        message: "User not found",
      });
    }

    return response.status(200).send({
      filteredUsers,
    });
  }
});

app.get("/api/products", (request, response) => {
  response.status(200).send({
    products: fakeProducts,
  });
});

// get user and product by id

app.get("/api/users/:id", (request, response) => {
  const parsedId = parseInt(request.params.id);

  if (isNaN(parsedId)) {
    return response.status(400).send({
      message: "Invalid id - Bad Request",
    });
  }

  const user = fakeUsers.find((user) => user.id === parsedId);

  if (!user)
    return response.status(404).send({
      message: "User not found",
    });

  return response.status(200).send({
    user,
  });
});

app.get("/api/products/:id", (request, response) => {
  const { id } = request.params;
  const product = fakeProducts.find((product) => product.id === Number(id));

  if (!product) {
    return response.status(404).send({
      message: "Product not found",
    });
  }

  return response.status(200).send({
    product,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
