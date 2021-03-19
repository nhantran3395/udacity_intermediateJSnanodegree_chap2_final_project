console.log("dinosaur rocks!")

const form = document.forms["user-info"]

form.addEventListener("submit", function (event) {
  event.preventDefault()
  const formData = new FormData(this)
  const entries = formData.entries()
  const data = Object.fromEntries(entries)

  const userName = data["user-name"]
  const userHeight = data["user-height-feet"]
  const userWeight = data["user-weight"]
  const userDiet = data["user-diet"]

  const human = (function () {
    let _name = userName
    let _height = userHeight
    let _weight = userWeight
    let _diet = userDiet

    function getName() {
      return _name
    }

    function getHeight() {
      return _height
    }

    function getWeight() {
      return _weight
    }

    function getDiet() {
      return _diet
    }

    return {
      name: getName(),
      height: getHeight(),
      weight: getWeight(),
      diet: getDiet(),
    }
  })()

  console.log(human)
})
