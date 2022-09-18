import { Request, Response } from "express";
import { BaseController } from "../config/controller.config";

// category controller for handing category route
export class CategoryController extends BaseController {
  // get all categories action
  getAll = async (request: Request, response: Response) => {
    const categories = await this.repo.category.findMany();
    return response.status(200).json({ categories });
  };

  // get single category action
  getOne = async (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const selectedCategory = await this.repo.category.findUnique({
      where: {
        id: +categoryId,
      },
    });
    if (!selectedCategory) {
      return response
        .status(404)
        .json({ message: "No Category Exist" });
    }
    return response.json({ category: selectedCategory });
  };

  // create category action
  create = async (request: Request, response: Response) => {
    const { title, amount } = request.body;
    const newCategory = await this.repo.category.create({
      data: {
        title,
        amount,
      },
    });
    return response.status(201).json({ category: newCategory });
  };

  // update category action
  update = async (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const updatedCategory = await this.repo.category.update({
      where: { id: +categoryId },
      data: request.body,
    });
    if (!updatedCategory) {
      return response
        .status(400)
        .json({ message: "Update Process Failed ..." });
    }
    return response.status(200).json({ category: updatedCategory });
  };
}
