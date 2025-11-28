import { maleNames, femaleNames, maleSurnames, femaleSurnames, workloads } from "./src/utilities/data.js";
import { getRandomElement, getRandomGender, randomBirthday, randomWorkload } from "./src/utilities/randomelement.js";
import { validateAgeRange } from "./src/utilities/validation.js";

/**
 * The main function which calls the application. 
 * Generates a list of employees with random data.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function main(dtoIn) {
  const { count, age } = dtoIn;
  const { min, max } = age;

  validateAgeRange(min, max);

  const dtoOut = [];

  for (let i = 0; i < count; i++) {
    const gender = getRandomGender();

    const name = gender === "male"
      ? getRandomElement(maleNames)
      : getRandomElement(femaleNames);

    const surname = gender === "male"
      ? getRandomElement(maleSurnames)
      : getRandomElement(femaleSurnames);

    dtoOut.push({
      gender,
      birthdate: randomBirthday(min, max),
      name,
      surname,
      workload: randomWorkload()
    });
  }
  
  //let dtoOut = exMain(dtoIn);
  return dtoOut;
}

