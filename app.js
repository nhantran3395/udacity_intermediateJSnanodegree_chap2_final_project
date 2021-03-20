console.log("dinosaur rocks!")

const human = (function () {
  let _name
  let _height
  let _weight
  let _diet

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

const formUserInfo = document.forms["user-info"]

formUserInfo.addEventListener("submit", function (event) {
  event.preventDefault()
  const formData = new FormData(this)
  const entries = formData.entries()
  const data = Object.fromEntries(entries)

  human.name = data["user-name"]
  human.height = data["user-height-feet"]
  human.weight = data["user-weight"]
  human.diet = data["user-diet"]

  formUserInfo.remove()
  document.getElementById("form-user-try-again").style.removeProperty("display")
  document.getElementById("image-background-dinosaur-skeleton").style.display =
    "none"
  document.getElementById("card-group").style.removeProperty("display")
})
