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
    fact: fact,
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

  document.getElementById("form-user-try-again").style.removeProperty("display")
  document.getElementById("image-background-dinosaur-skeleton").style.display =
    "none"
  document.getElementById("card-group").style.removeProperty("display")

  document.getElementById("card-title-human").textContent = human.name

  dinosaursBird.forEach((animal, idx) => {
    document.getElementById(`card-title-${idx + 1}`).textContent =
      animal.species

    document
      .getElementById(`card-img-${idx + 1}`)
      .setAttribute("src", `./images/${animal.species.toLowerCase()}.png`)

    if (animal.fact) {
      document.getElementById(`card-text-${idx + 1}`).textContent = animal.fact
    } else if (animal.facts) {
      document.getElementById(`card-text-${idx + 1}`).textContent =
        animal.facts[0]
    }
  })
})
