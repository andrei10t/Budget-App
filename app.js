var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id
    this.value = value
    this.description = description
  }
  var Income = function (id, description, value) {
    this.id = id
    this.value = value
    this.description = description
  }

  var data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    }
  }

  return {
    addItem: function (type, des, val) {
      var newItem, ID
      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1
      } else ID = 0
      // create new item
      if (type === 'expense') {
        newItem = new Expense(ID, des, val)
      } else if (type === 'income') {
        newItem = new Income(ID, des, val)
      }

      data.allItems[type].push(newItem)
      return newItem
    },
    testing: function () {
      console.log(data)
    }
  }
})()

var uiController = (function () {
  var DOMstrings = {
    typeS: '.add__type',
    descriptionS: '.add__description',
    valueS: '.add__value',
    addBtnS: '.add__btn'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.typeS).value,
        description: document.querySelector(DOMstrings.descriptionS).value,
        value: document.querySelector(DOMstrings.valueS).value
      }
    },

    getDOMstrings: function () {
      return DOMstrings
    }
  }
})()

var controller = (function (budgetCtrl, uiCtrl) {
  var setupEventListeners = function () {
    var DOM = uiCtrl.getDOMstrings()
    document.querySelector(dom.addBtnS).addEventListener('click', ctrlAddItem)
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        ctrlAddItem()
      }
    })
  }

  var dom = uiController.getDOMstrings()
  var ctrlAddItem = function () {
    var input, newItem

    // input data
    input = uiCtrl.getInput()
    // item added to budgetController
    newItem = budgetCtrl.addItem(input.type, input.description, input.value)
    // item added to ui
    // final calculations
    // show the budget
  }

  return {
    init: function () {
      console.log('App started')
      setupEventListeners()
    }
  }
})(budgetController, uiController)

controller.init()
