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
const DATE_TOLERANCE_MS = (1/12) * 365.25*24*60*60*1000; 

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomGender() {
    return Math.random() < 0.5 ? "male" : "female";
}

function randomBirthday(minAge, maxAge, usedDates) {
    const now = Date.now();
    const maxBirth = now - minAge*365.25*24*60*60*1000;
    const minBirth = now - maxAge*365.25*24*60*60*1000;

    let birthTime;
    do {
        birthTime = Math.floor(minBirth + Math.random()*(maxBirth-minBirth));
    } while (usedDates.has(birthTime));

    usedDates.add(birthTime);
    return new Date(birthTime).toISOString();
}

function randomWorkload() {
    return getRandomElement(workloads);
}

// Main function
/**
 * Generates a list of employees with random data.
 * @param {object} dtoIn - {count: number, age: {min, max}}
 * @returns {Array} Array of employee objects
 */
export function main(dtoIn) {
    const { count, age } = dtoIn;
    const { min, max } = age;

    if (min < 18 || max > 60 || min > max) throw new Error("Invalid age interval");

    const dtoOut = [];
    const usedDates = new Set();

    for (let i=0;i<count;i++) {
        const gender = getRandomGender();
        const name = gender === "male" ? getRandomElement(maleNames) : getRandomElement(femaleNames);
        const surname = gender === "male" ? getRandomElement(maleSurnames) : getRandomElement(femaleSurnames);

        dtoOut.push({
            gender,
            name,
            surname,
            workload: randomWorkload(),
            birthdate: randomBirthday(min, max, usedDates)
        });
    }

    return dtoOut;
}
