import { Recipe } from "./recipe";

export interface Response {
    status: "OK" | "error";
    message?: string;
}

export interface APIRecipeResponse extends Response {
    recipe: Recipe;
}
