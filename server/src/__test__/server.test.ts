/**
 * @example 
 * describe("Nuestro primer test", () => {
  it("Debe revisar suma 1+1", () => {
    expect(1 + 1).toBe(2);
  });
  it("Debe revisar suma 1+1 no sea 3", () => {
    expect(1 + 1).not.toBe(3);
  });
});
 */

import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

// Mock para error a conexion a bd
jest.mock("../config/db");
describe("connectDB", () => {
  it("should handle database connection error", async () => {
    // crea funcion en mock y espia en el metodo indicado
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Error en conexion db catch"));
    const consoleSpy = jest.spyOn(console, "error");
    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error conectando a db")
    );
  });
});
