import request from "supertest";
import app from "../config/app.config";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

describe("User Endpoints", () => {
  let prisma: PrismaClient;
  beforeAll(() => {
    prisma = new PrismaClient();
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  // LOGIN ENDPOINTS
  describe("LOGIN USER : /user/login", () => {
    it("SUCCESS", async () => {
      const credential = {
        email: "hosein@gmail.com",
        password: "123456789",
      };
      const response = await request(app())
        .post("/user/login")
        .send(credential);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ token: expect.any(String) });
    });

    // TEST CASE FOR INVALID USER
    it("FAILED INVALID USER", async () => {
      // USER WITH INVALID DATA
      const credential = {
        email: "hosein@gmail.com",
        password: "________",
      };
      // SEND REQUEST TO LOGIN
      const response = await request(app())
        .post("/user/login")
        .send(credential);

      // CHECK STATUS CODE
      expect(response.statusCode).toBe(400);
      // CHECK RESPONSE SHAPE
      expect(response.body).toEqual({
        message: "Email Address Dosn't Match With Password",
      });
    });

    // TEST CASE FOR LOGIN VALIDATION
    it("FAILED VALIDATION FAILED", async () => {
      // CREDENTIALS HAS INVALID DATA SO VALIDATION MUST BE FAILED
      const credential = {
        email: "something invalid", // FORMAT MUST BE EMAIL
        password: "__", // LENGTH MUST BE 8
      };
      // SEND REQUEST TO LOGIN
      const response = await request(app())
        .post("/user/login")
        .send(credential);
      // CHECK STATUS CODE
      expect(response.statusCode).toBe(400);
      //   CHECK RESPONSE SHAPE
      expect(response.body).toEqual({
        messages: [
          "you must enter valid email address",
          "your password must contain atleast 8 character",
        ],
      });
    });
  });

  // SIGNUP ENDPOINTS
  describe("SIGNUP USER : /user/signup", () => {
    it("SUCCESS", async () => {
      // RANDOM EMAIL WITH SIMPLE PASSWORD
      const credential = {
        email: `new-gmail-${Date.now()}@gmail.com`,
        password: "123456789",
      };
      const response = await request(app())
        .post("/user/signup")
        .send(credential);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ token: expect.any(String) });
    });

    // TEST CASE FOR INVALID USER
    it("FAILED INVALID USER SIGNUP", async () => {
      // EMAIL IS ALREADY EXIST IN DATABASE
      const credential = {
        email: "hosein@gmail.com",
        password: "________",
      };
      // SEND REQUEST TO SIGNUP
      const response = await request(app())
        .post("/user/signup")
        .send(credential);

      // CHECK STATUS CODE
      expect(response.statusCode).toBe(400);
      // CHECK RESPONSE SHAPE
      expect(response.body).toEqual({
        message: "Email is already taken",
      });
    });

    // TEST CASE FOR SIGNUP VALIDATION
    it("FAILED VALIDATION FAILED", async () => {
      // CREDENTIALS HAS INVALID DATA SO VALIDATION MUST BE FAILED
      const credential = {
        email: "something invalid", // FORMAT MUST BE EMAIL
        password: "__", // LENGTH MUST BE 8
      };
      // SEND REQUEST TO SIGNUP
      const response = await request(app())
        .post("/user/signup")
        .send(credential);
      // CHECK STATUS CODE
      expect(response.statusCode).toBe(400);
      //   CHECK RESPONSE SHAPE
      expect(response.body).toEqual({
        messages: [
          "you must enter valid email address",
          "your password must contain atleast 8 character",
        ],
      });
    });
  });

  // PROFILE ENDPOINTS
  describe("PROFILE USER : /user", () => {
    // CHECK GET USER PROFILE BASED ON AUTHORIZED TOKEN
    it("SUCCESS - FETCH USER INFORMATION BASED ON TOKEN", async () => {
      // FIND RANDOM USER FROM DB
      const user = await prisma.user.findFirst();
      // GENERATE TOKEN BASED ON RANDOM USER
      const token = jwt.sign(
        { id: user?.id, role: user?.role },
        "supersecretkey",
        { expiresIn: "1m" }
      );
      // SEND REQUEST TO /user
      const response = await request(app())
        .get("/user")
        .set({ authorization: `Bearer ${token}` });

      // CHECK STATUS CODE
      expect(response.statusCode).toBe(200);
      //   CHECK RESPONSE SHAPE
      expect(response.body).toEqual({
        user: expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          password: expect.any(String),
          bio: expect.any(String),
          role: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      });
    });

    it("FAILED - FETCH USER INFORMATION WITHOUT ANY EXISTTING TOKEN ON HEADER", async () => {
      const response = await request(app()).get("/user");
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ message: "Unauthorization" });
    });
  });
});
