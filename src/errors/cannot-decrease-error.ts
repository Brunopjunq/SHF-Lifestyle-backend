import { ApplicationError } from "../protocols.js";

export function cannotDecreaseError(): ApplicationError {
  return {
    name: "CannotDecreaseError",
    message: "Cannot decrease water count! WaterCount = 0",
  };
}