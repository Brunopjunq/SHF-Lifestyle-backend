import { ApplicationError } from "../protocols.js";

export function duplicatedWaterCountError(): ApplicationError {
  return {
    name: "DuplicatedWaterCountError",
    message: "There is already an waterCount for this user",
  };
}