// Data
const maleNames = [
    "Jan","Petr","Jakub","Tomáš","Lukáš","Matěj","Adam","Ondřej","Martin","Filip",
    "Vojtěch","Marek","Jiří","Karel","Michal","Daniel","David","Josef","Jaroslav","Roman",
    "Milan","Radek","Aleš","Patrik","Dominik","Šimon","Samuel","Robin","Vladimír","Radim",
    "Hynek","Vít","Sebastian","Erik","Richard","Rudolf","Bohuslav","Oldřich","Pavel","Libor",
    "Igor","Stanislav","Marcel","Eduard","Břetislav","Leoš","Alan","Vilém","Čeněk","Vlastimil"
];

const maleSurnames = [
    "Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Kučera","Veselý","Horák","Němec",
    "Marek","Pokorný","Král","Růžička","Beneš","Fiala","Sedláček","Doležal","Zeman","Kolář",
    "Urban","Kopecký","Čermák","Vaněk","Kříž","Pospíšil","Musil","Šimek","Říha","Steiner",
    "Moravec","Bláha","Havlíček","Matoušek","Hlavatý","Krejčí","Beran","Bartoš","Straka","Ouředník",
    "Vávra","Sýkora","Tichý","Vondráček","Kubík","Slavík","Ptáček","Holub","Hájek","Vacek"
];

const femaleNames = [
    "Lucie","Eva","Anna","Marie","Tereza","Adéla","Eliška","Natálie","Kristýna","Veronika",
    "Karolína","Barbora","Klára","Nikola","Markéta","Kateřina","Hana","Jana","Monika","Alena",
    "Rozálie","Sofie","Magdaléna","Gabriela","Simona","Denisa","Petra","Sandra","Zuzana","Nela",
    "Linda","Lenka","Pavla","Ivana","Karina","Viktorie","Amálie","Beáta","Laura","Stela",
    "Olga","Šárka","Blanka","Aneta","Michaela","Renata","Radka","Andrea","Sabina","Helena"
];

const femaleSurnames = [
    "Nováková","Svobodová","Novotná","Dvořáková","Černá","Procházková","Kučerová","Veselá","Horáková","Němcová",
    "Marková","Pokorná","Králová","Růžičková","Benešová","Fialová","Sedláčková","Doležalová","Zemanová","Kolářová",
    "Urbanová","Kopecká","Čermáková","Vaňková","Křížová","Pospíšilová","Musilová","Šimková","Říhová","Steinerová",
    "Moravcová","Bláhová","Havlíčková","Matoušková","Hlavatá","Krejčíová","Beranová","Bartošová","Straková","Ouředníková",
    "Vávrová","Sýkorová","Tichá","Vondráčková","Kubíková","Slavíková","Ptáčková","Holubová","Hájeková","Vacková"
];

const workloads = [10, 20, 30, 40];

// Utility functions
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomGender() {
    return Math.random() < 0.5 ? "male" : "female";
}

function randomBirthday(minAge, maxAge, usedDates) {
    if (minAge > maxAge) [minAge, maxAge] = [maxAge, minAge];
    minAge = Math.max(18, minAge);
    maxAge = Math.min(60, maxAge);

    const now = Date.now();
    const yearMs = 365.25 * 24 * 60 * 60 * 1000;
    let birthTime;

    do {
        const youngest = now - minAge * yearMs;
        const oldest = now - maxAge * yearMs;
        birthTime = Math.floor(oldest + Math.random() * (youngest - oldest));
    } while (usedDates.has(birthTime));

    usedDates.add(birthTime);
    return new Date(birthTime).toISOString();
}

function randomWorkload() {
    return getRandomElement(workloads);
}

// Validate age range
function validateAgeRange(minAge, maxAge) {
    if (minAge < 18 || maxAge > 60) throw new Error("Age must be within <18, 60>");
    if (minAge > maxAge) throw new Error("minAge cannot be greater than maxAge");
}

// Main function
/**
 * Generates a list of employees with random data.
 * @param {object} dtoIn - { count, age: {min, max} }
 * @returns {Array} Array of employee objects
 */
export function main(dtoIn) {
    const { count, age } = dtoIn;
    const { min, max } = age;

    validateAgeRange(min, max);

    const dtoOut = [];
    const usedDates = new Set();

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
            birthdate: randomBirthday(min, max, usedDates),
            name,
            surname,
            workload: randomWorkload()
        });
    }

    return dtoOut;
}
