import {subcategories} from "../../data/subcategories.js";

export const GetSubCategory = (subCategoryId) =>{
    return subcategories.find(item => item.SubCategoryId === subCategoryId);
}