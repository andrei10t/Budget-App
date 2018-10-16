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
  // in case I need to change something quick
  var DOMstrings = {
    typeS: '.add__type',
    descriptionS: '.add__description',
    valueS: '.add__value',
    addBtnS: '.add__btn',
    incomeContain: '.income__list',
    expenseContain: '.expenses__list'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.typeS).value,
        description: document.querySelector(DOMstrings.descriptionS).value,
        value: document.querySelector(DOMstrings.valueS).value
      }
    },

    addListItem: function (obj, type) {
      var html, newHtml, element
      // create html string with placeholder

      if (type === 'income') {
        element = DOMstrings.incomeContain
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline" /></button></div></div></div>'
      } else {
        element = DOMstrings.expenseContain
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      // replace text
      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description)
      newHtml = newHtml.replace('%value%', obj.value)

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
    },
    clearField: function () {
      var fields, fieldsArr
      // qSA returns a list
      fields = document.querySelectorAll(
        DOMstrings.descriptionS + ', ' + DOMstrings.valueS
      )
      // we trick it
      fieldsArr = Array.prototype.slice.call(fields)
      fieldsArr.forEach(function (current, index, arr) {
        current.value = ''
      })
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
    uiCtrl.addListItem(newItem, input.type)
    // clear fields
    uiCtrl.clearField()
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
