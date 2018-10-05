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

var uiController = (function () {})()

var controller = (function (budgetCtrl, uiCtrl) {
  var z = budgetCtrl.test(5)

  return {
    anotherTest: function () {
      console.log(z)
    }
  }
})(budgetController, uiController)
