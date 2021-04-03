const MAX_NUM_DINO_FACT = 6;

function ratioCalculatorUtil(num1, num2) {
  return (num1 / num2).toFixed(3);
}

function getRandomIntUtil(max) {
  return Math.floor(Math.random() * max);
}

function setUpAfterUserSumbit() {
  const formUserTryAgain = document.getElementById('form-user-try-again');
  formUserTryAgain.style.removeProperty('display');

  const backgroundImg = document.getElementById(
    'image-background-dinosaur-skeleton',
  );
  backgroundImg.style.display = 'none';

  const cardGroup = document.getElementById('card-group');
  cardGroup.style.removeProperty('display');
}

function prepareCardData(animal, idx) {
  const { species, weight, height, diet, where, when, facts } = animal;

  // card title
  const cardTitle = document.getElementById(`card-title-${idx + 1}`);
  cardTitle.textContent = species;

  // card img
  const cardImg = document.getElementById(`card-img-${idx + 1}`);
  cardImg.setAttribute('src', `./images/${animal.species.toLowerCase()}.png`);

  // card text
  const cardText = document.getElementById(`card-text-${idx + 1}`);
  cardText.textContent = Array.isArray(facts)
    ? facts[getRandomIntUtil(MAX_NUM_DINO_FACT)]
    : facts;

  // card popover
  const cardPopover = document.getElementById(`card-button-${idx + 1}`);

  const contentsInPopover =
    `weight: ${weight} <br>` +
    `height: ${height} <br>` +
    `diet: ${diet} <br>` +
    `where: ${where} <br>` +
    `when: ${when} <br>`;

  cardPopover.setAttribute('data-bs-content', contentsInPopover);
  cardPopover.setAttribute('data-bs-original-title', species);
}

function Dinosaur(animal) {
  const { species, weight, height, diet, where, when, fact } = animal;
  const facts = [];

  const getWeightComparisionWithHuman = (humanWeight) => {
    const ratio = ratioCalculatorUtil(weight, humanWeight);
    return `${species} weight ${ratio} times more than you`;
  };

  const getHeightComparisionWithHuman = (humanHeight) => {
    const ratio = ratioCalculatorUtil(height, humanHeight);
    return `${species} weight ${ratio} times more than you`;
  };

  const getDietComparisonWithHuman = (humanDiet) => {
    let comparision = '';

    if (diet === humanDiet) {
      comparision = `${species} share the same diet with you`;
    } else {
      comparision = `${species} is a ${diet}, while you are a ${humanDiet}`;
    }

    return comparision;
  };

  const putFact = (newFact) => {
    if (facts.length < MAX_NUM_DINO_FACT) {
      facts.push(newFact);
    }
  };

  facts[0] = fact;
  facts.push(`${species} live on Earth in ${when}`);
  facts.push(`${species} can be found in ${where}`);

  return {
    species,
    weight,
    height,
    diet,
    where,
    when,
    facts,
    getWeightComparisionWithHuman,
    getHeightComparisionWithHuman,
    getDietComparisonWithHuman,
    putFact,
  };
}

function Bird(animal) {
  const { species, weight, height, diet, where, when, fact } = animal;

  return {
    species,
    weight,
    height,
    diet,
    where,
    when,
    facts: fact,
  };
}

function Human(name, heightFeet, heightInches, weight, diet) {
  const height = (function getUserHeightInFeet() {
    const inchToFeetMultiplier = 0.0833333333;

    return (
      Number(heightFeet) +
      Number((heightInches * inchToFeetMultiplier).toFixed(1))
    );
  })(heightFeet, heightInches);

  return {
    species: 'Human',
    name,
    height,
    weight: Number(weight),
    diet,
  };
}

const formUserInfo = document.forms['user-info'];

formUserInfo.addEventListener('submit', function formSumbitHandler(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);

  const userName = data['user-name'];
  const userHeightFeet = data['user-height-feet'];
  const userHeightInches = data['user-height-inches'];
  const userWeight = data['user-weight'];
  const userDiet = data['user-diet'];

  const human = Human(
    userName,
    userHeightFeet,
    userHeightInches,
    userWeight,
    userDiet,
  );

  const dinosaurs = dinos
    .filter((dino) => dino.species !== 'Pigeon')
    .map((dino) => Dinosaur(dino));

  dinosaurs.forEach((dinosaur) => {
    const {
      putFact,
      getWeightComparisionWithHuman,
      getHeightComparisionWithHuman,
      getDietComparisonWithHuman,
    } = dinosaur;
    putFact(getWeightComparisionWithHuman(human.weight));
    putFact(getHeightComparisionWithHuman(human.height));
    putFact(getDietComparisonWithHuman(human.diet));
  });

  const bird = Bird(dinos.find((dino) => dino.species === 'Pigeon'));

  // store bird and dinosaurs in new array then shuffle
  const dinosaursBird = dinosaurs.concat(bird).sort(() => Math.random() - 0.5);

  formUserInfo.remove();

  setUpAfterUserSumbit();

  // prepare card data for human
  const cardTitleHuman = document.getElementById('card-title-human');
  cardTitleHuman.textContent = human.name;

  const cardPopoverHuman = document.getElementById('card-button-human');
  const contentsInPopoverHuman =
    `You are cool! <br>` +
    `weight: ${human.weight} <br>` +
    `height: ${human.height} <br>` +
    `diet: ${human.diet} <br>`;

  cardPopoverHuman.setAttribute('data-bs-content', contentsInPopoverHuman);

  // prepare card data for each dinosaur and bird
  dinosaursBird.forEach((animal, idx) => {
    prepareCardData(animal, idx);
  });
});
