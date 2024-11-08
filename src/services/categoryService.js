import {categories } from "../../data/categories.js";

export const GetCategory = (categoryId) =>{
    return categories.find(c => c.CategoryId === categoryId);
};