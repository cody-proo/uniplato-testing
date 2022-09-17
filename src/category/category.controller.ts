import { Request, Response } from "express";
import { BaseController } from "../config/controller.config";

export class CategoryController extends BaseController {
  getAll = async (request: Request, response: Response) => {
    const categories = await this.repo.category.findMany();
    return response.status(200).json({ categories });
  }

  getOne = async (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const selectedCategory = await this.repo.category.findUniqueOrThrow({
      where: {
        id: +categoryId,
      },
    });
    return response.json({ category: selectedCategory });
  }

  create = async (request: Request, response: Response) => {
    const { title, amount } = request.body;
    const newCategory = await this.repo.category.create({
      data: {
        title,
        amount
      },
    });
    return response.status(201).json({ category: newCategory });
  }

  update = async (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const updatedCategory = await this.repo.category.update({
      where: { id: +categoryId },
      data: request.body,
    });
    if (!updatedCategory) {
      throw new Error("Something Wrong in Updating");
    }
    return response.status(200).json({ category: updatedCategory });
  }
}
