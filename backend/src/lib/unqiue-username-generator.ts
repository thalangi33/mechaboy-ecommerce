import { generateUsername } from "unique-username-generator";

export const generateDisplayName = () => {
  return generateUsername("", 3);
};
