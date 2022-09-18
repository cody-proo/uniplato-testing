import request from "supertest";
import app from "../config/app.config";
import jwt from "jsonwebtoken";
import { PrismaClient, UserRole } from "@prisma/client";
import { config } from "../config";

describe("Category Endpoints", () => {
  let prisma: PrismaClient;
  beforeAll(() => {
    prisma = new PrismaClient();
  });
  describe("FETCH ALL : /category", () => {
    it("Success", async () => {
      const response = await request(app()).get("/category");
      // check response shape
      expect(response.body).toEqual({
        categories: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            amount: expect.any(Number),
          }),
        ]),
      });
      // check response status
      expect(response.statusCode).toBe(200);
    });
  });

  describe("FETCH SINGLE : /category/:id", () => {
    it("Failed", async () => {
      const response = await request(app()).get("/category/123456");
      expect(response.statusCode).toBe(404);
    });

    it("Success", async () => {
      const data = await prisma.category.findFirst();
      const response = await request(app()).get(
        `/category/${data?.id}`
      );
      expect(response.body).toEqual({
        category: expect.objectContaining({
          title: expect.any(String),
          id: expect.any(Number),
          amount: expect.any(Number),
        }),
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("CREATE CATEGORY : /category", () => {
    it("Failed PERMISSION DENIED", async () => {
      const collaboratorUser = await prisma.user.findFirst({
        where: { role: UserRole.COLLABORATOR },
      });
      const token = jwt.sign(
        { id: collaboratorUser?.id, role: collaboratorUser?.role },
        "supersecretkey",
        { expiresIn: config.TOKEN_EXP }
      );
      const response = await request(app())
        .post("/category")
        .set({ authorization: `Bearer ${token}` })
        .send({ title: "Some Title", amount: 1 });

      expect(response.body).toEqual({
        message: "Permission Denied",
      });

      expect(response.statusCode).toEqual(403);
    });
    it("Failed UNAUTH", async () => {
      const response = await request(app())
        .post("/category")
        .send({ title: "Some Title", amount: 1 });

      expect(response.body).toEqual({
        message: "Unauthorization",
      });

      expect(response.statusCode).toEqual(401);
    });
    it("SUCCESS", async () => {
      const adminUser = await prisma.user.findFirst({
        where: { role: UserRole.ADMIN },
      });
      const token = jwt.sign(
        { id: adminUser?.id, role: adminUser?.role },
        "supersecretkey",
        { expiresIn: config.TOKEN_EXP }
      );
      const response = await request(app())
        .post("/category")
        .set({ authorization: `Bearer ${token}` })
        .send({ title: "Some Title", amount: 1 });

      expect(response.body).toEqual({
        category: expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          amount: expect.any(Number),
        }),
      });

      expect(response.statusCode).toEqual(201);
    });
  });

  describe("UPDATE CATEGORY : /category", () => {
    it("SUCCESS - TITLE UPDATE", async () => {
      const user = await prisma.user.findFirst({});
      const category = await prisma.category.findFirst({});
      const token = jwt.sign(
        { id: user?.id, role: user?.role },
        "supersecretkey",
        { expiresIn: config.TOKEN_EXP }
      );
      const response = await request(app())
        .patch(`/category/${category?.id}`)
        .set({ authorization: `Bearer ${token}` })
        .send({ title: "UPDATE TITLE" });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        category: expect.objectContaining({
          title: "UPDATE TITLE",
          amount: expect.any(Number),
          id: expect.any(Number),
        }),
      });
      const updatedCategory = await prisma.category.findUnique({
        where: { id: category?.id },
      });
      expect(updatedCategory).toEqual(
        expect.objectContaining({
          title: "UPDATE TITLE",
          amount: expect.any(Number),
          id: expect.any(Number),
        })
      );
    });

    it("SUCCESS - AMOUNT UPDATE", async () => {
      const user = await prisma.user.findFirst({});
      const category = await prisma.category.findFirst({});
      const token = jwt.sign(
        { id: user?.id, role: user?.role },
        "supersecretkey",
        { expiresIn: config.TOKEN_EXP }
      );
      const response = await request(app())
        .patch(`/category/${category?.id}`)
        .set({ authorization: `Bearer ${token}` })
        .send({ amount: 10 });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        category: expect.objectContaining({
          title: expect.any(String),
          amount: 10,
          id: expect.any(Number),
        }),
      });
      const updatedCategory = await prisma.category.findUnique({
        where: { id: category?.id },
      });
      expect(updatedCategory).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          amount: 10,
          id: expect.any(Number),
        })
      );
    });

    it("SUCCESS - BOTH UPDATE", async () => {
      const user = await prisma.user.findFirst({});
      const category = await prisma.category.findFirst({});
      const token = jwt.sign(
        { id: user?.id, role: user?.role },
        "supersecretkey",
        { expiresIn: config.TOKEN_EXP }
      );
      const response = await request(app())
        .patch(`/category/${category?.id}`)
        .set({ authorization: `Bearer ${token}` })
        .send({ amount: 10, title: "BOTH UPDATE" });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        category: expect.objectContaining({
          amount: 10,
          title: "BOTH UPDATE",
          id: expect.any(Number),
        }),
      });
      const updatedCategory = await prisma.category.findUnique({
        where: { id: category?.id },
      });
      expect(updatedCategory).toEqual(
        expect.objectContaining({
          amount: 10,
          title: "BOTH UPDATE",
          id: expect.any(Number),
        })
      );
    });
  });
});
