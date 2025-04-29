import request from "supertest";
import server from "../../server";
describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should validate price", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Teclado - test",
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should create new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Teclado - testing",
      price: 400,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});
describe("GET api/products", () => {
  it("GET JSON response with product", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("data");
  });
});
describe("GET /api/products/:id", () => {
  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
  it("Should check valid Id", async () => {
    const productId = "not-valid-id";
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe("ID no valido");
  });
  it("Get JSON Response for a good ID", async () => {
    const productId = 1;
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});
describe("PUT /api/products/:id", () => {
  it("Should update product", async () => {
    const productId = 1;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Teclado-test",
      price: 400,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Teclado",
      price: 400,
    });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
  it("Should display validation errors when updating products", async () => {
    const res = await request(server).put("/api/products/1").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(4);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });
  it("should validate price existing product", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Teclado - test",
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
});
describe("PATCH /api/products/:id", () => {
  it("should return error id non existing", async () => {
    const productId = 2000;
    const res = await request(server).patch(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Producto no encontrado");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("body");
  });
  it("should change availability", async () => {
    const productId = 1;
    const res = await request(server).patch(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});
describe("DELETE /api/products/:id", () => {
  it("should 400 check no valid id", async () => {
    const res = await request(server).delete("/api/products/no-valid");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should 404 check no exist id", async () => {
    const res = await request(server).delete("/api/products/200");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
  it("should delete product", async () => {
    const res = await request(server).delete("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBe("producto eliminado");

    expect(res.status).not.toBe(400);
  });
});
