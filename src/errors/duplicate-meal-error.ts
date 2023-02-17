import { ApplicationError } from "../protocols.js";

export function duplicatedMealError(): ApplicationError {
  return {
    name: "DuplicatedMealError",
    message: "There is already a meal for this user",
  };
}