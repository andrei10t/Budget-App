var budgetController = (function () {
  var x = 2
  var add = function (a) {
    return x + a
  }
  return {
    test: function (b) {
      return add(b)
    }
  }
})()

var uiController = (function () {
  return {
    getInput: function () {
      return {
        type: document.querySelector('.add__type').value,
        description: document.querySelector('.add__description').value,
        value: document.querySelector('.add__value').value
      }
    }
  }
})()

var controller = (function (budgetCtrl, uiCtrl) {
  var ctrlAddItem = function () {
    // input data
    var input = uiCtrl.getInput()
    console.log(input)
    // item added to budgetController
    // item added to ui
    // final calculations
    // show the budget
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

  document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      ctrlAddItem()
    }
  })
})(budgetController, uiController)
