import { menuArray } from './data.js'

let orderArray = []
const paymentForm = document.getElementById('payment-form')

document.addEventListener('click', function(e){
    if(e.target.dataset.addBtn){
        fillOrderArray(e.target.dataset.addBtn)
        getFeedOrderHtml()
        renderOrder()
    } else if(e.target.dataset.removeBtn){
        removeFromOrderArray(e.target.dataset.removeBtn)
        renderOrder()
    } else if(e.target.id === 'complete-btn'){
        renderPaymentForm()
    } else if(e.target.id === 'close-payment'){
        document.getElementById('payment-form').innerHTML = ''
    } 
})

paymentForm.addEventListener('submit', function(e){
        e.preventDefault()
        const name = document.getElementById('card-name').value
        
        document.getElementById('payment-form').innerHTML = ''
        document.getElementById('order-info').innerHTML = `
            <div class="confirmation-order">
                <p>Thanks, ${name}! Your order is on its way!</p>
            </div>
            `        
})

function getFeedHtml(){
    let feedHtml = ``
    
    if(menuArray.length > 0){
        menuArray.forEach(function(product) {
        feedHtml += `
        <div class="products">
            <div class="product-inner">
                <p class="emoji">${product.emoji}</p>
                <div class="product-info">
                    <h2 class="bold-text">${product.name}</h2>
                    <p class="ingredients">${product.ingredients} </p>
                    <p class="price">$${product.price}</p>
                </div> 
                <div class="add-product">
                    <button class="add-btn" data-add-btn="${product.id}">+</button>
                </div>
                
            </div>
        </div>
        <div class="underline"></div>
        `    
        })
    }
    return feedHtml
}

function renderMenu(){
    document.getElementById('menu').innerHTML = getFeedHtml()
}

function fillOrderArray(menuElId){
    const targetProduct = menuArray.filter(function(menu){
       return menu.id === Number(menuElId)
    })[0]
    
    orderArray.push(targetProduct)
}

function removeFromOrderArray(removeBtnId){
    
   const index = orderArray.findIndex(x => x.id === Number(removeBtnId))
   orderArray.splice(index, 1)
        
}

function getFeedOrderHtml(){
    let feedOrder = ``
    
    if(orderArray.length > 0){
        orderArray.forEach(function(order){
            feedOrder += `
            <div class="order-list-product">
                <h2 class="bold-text">${order.name}</h2>
                <button class="remove-btn" data-remove-btn=${order.id}>remove</button>
                <p class="price">$${order.price}</p>
            </div>
            `
        })
    }
    return feedOrder   
}

function renderOrder(){
    if (orderArray.length > 0){
        let totalPrice = 0
    orderArray.forEach(function(order){
        totalPrice += order.price
    })
    
    document.getElementById('order-info').innerHTML = `
        <h3>Your order</h3>
        ${getFeedOrderHtml()}
        <div class="order-underline">
        </div>
        <div class="order-list-product">
            <h4 class="bold-text">Total price</h4>
            <p class="price">$${totalPrice}</p>
         </div>
         <button class="complete-btn" id="complete-btn">Complete order</button>
        `
    } else {
        document.getElementById('order-info').innerHTML = ""
    }
    
}

function renderPaymentForm(){
    document.getElementById('payment-form').innerHTML = `
        <div class="payment-element">
            <button id="close-payment">X</button>
            <h5 class="bold-text">Enter card details</h5>
            <form id="payment-form" class="payment-form">
                <input type="text" name="card-name" id="card-name" placeholder="Enter your name"  required>
                <input type="text" name="card-num" placeholder="Enter card number" size="16" id="cr_no"     minlength="16" maxlength="16" required>
                <input type="text" name="card-cvv" placeholder="Enter CVV" size="3" id="cr_no"              minlength="3" maxlength="3">
                <button type="submit" class="complete-btn" id="pay-btn">Pay</button>
            </form>
       </div>
        `
}

renderMenu()