console.log("dinosaur rocks!")

const MAX_NUM_DINO_FACT = 6

function Dinosaur(animal) {
  let { species, weight, height, diet, where, when, fact } = animal
  let _facts = new Array(MAX_NUM_DINO_FACT)

  _facts[0] = fact

  return {
    species: species,
    weight: weight,
    height: height,
    diet: diet,
    where: where,
    when: when,
    facts: _facts,
  }
}

function Bird(animal) {
  let { species, weight, height, diet, where, when, fact } = animal

  return {
    species: species,
    weight: weight,
    height: height,
    diet: diet,
    where: where,
    when: when,
    facts: fact,
  }
}

function Human(name, heightFeet, heightInches, weight, diet) {
  let height = (function getUserHeightInFeet(heightFeet, heightInches) {
    const inchToFeetMultiplier = 0.0833333333

    return (
      Number(heightFeet) +
      Number((heightInches * inchToFeetMultiplier).toFixed(1))
    )
  })(heightFeet, heightInches)

  return {
    species: "Human",
    name: name,
    height: height,
    weight: Number(weight),
    diet: diet,
  }
}

const formUserInfo = document.forms["user-info"]

formUserInfo.addEventListener("submit", function (event) {
  event.preventDefault()
  const formData = new FormData(this)
  const entries = formData.entries()
  const data = Object.fromEntries(entries)

  const userName = data["user-name"]
  const userHeightFeet = data["user-height-feet"]
  const userHeightInches = data["user-height-inches"]
  const userWeight = data["user-weight"]
  const userDiet = data["user-diet"]

  const human = Human(
    userName,
    userHeightFeet,
    userHeightInches,
    userWeight,
    userDiet
  )

  const dinosaurs = dinos
    .filter((dino) => dino.species != "Pigeon")
    .map((dino) => Dinosaur(dino))

  const bird = Bird(dinos.find((dino) => dino.species == "Pigeon"))

  //store bird and dinosaurs in new array then shuffle
  const dinosaursBird = dinosaurs.concat(bird).sort(() => Math.random() - 0.5)

  formUserInfo.remove()

  setUpAfterUserSumbit()

  const cardTitleHuman = document.getElementById("card-title-human")
  cardTitleHuman.textContent = human.name

  //prepare card data for each dinosaur and bird
  dinosaursBird.forEach((animal, idx) => {
    prepareCardData(animal, idx)
  })
})

function setUpAfterUserSumbit() {
  const formUserTryAgain = document.getElementById("form-user-try-again")
  formUserTryAgain.style.removeProperty("display")

  const backgroundImg = document.getElementById(
    "image-background-dinosaur-skeleton"
  )
  backgroundImg.style.display = "none"

  const cardGroup = document.getElementById("card-group")
  cardGroup.style.removeProperty("display")
}

function prepareCardData(animal, idx) {
  const { species, weight, height, diet, where, when, facts } = animal

  //card title
  const cardTitle = document.getElementById(`card-title-${idx + 1}`)
  cardTitle.textContent = species

  //card img
  const cardImg = document.getElementById(`card-img-${idx + 1}`)
  cardImg.setAttribute("src", `./images/${animal.species.toLowerCase()}.png`)

  //card text
  const cardText = document.getElementById(`card-text-${idx + 1}`)
  cardText.textContent = Array.isArray(facts) ? facts[0] : facts

  //card popover
  const cardPopover = document.getElementById(`card-button-${idx + 1}`)

  const contentsInPopover =
    `weight: ${weight} <br>` +
    `height: ${height} <br>` +
    `diet: ${diet} <br>` +
    `where: ${where} <br>` +
    `when: ${when} <br>`

  cardPopover.setAttribute("data-bs-content", contentsInPopover)
  cardPopover.setAttribute("data-bs-original-title", species)
}
