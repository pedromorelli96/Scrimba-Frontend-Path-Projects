import { menuArray, foodList, beverageList } from "./data.js";

const cardForm = document.getElementById("card-form");
const modal = document.getElementById("modal");

let order = [];
let username = "";
const orderDiscount = 0.9; // 10% discount

document.addEventListener("click", function (e) {
    if (e.target.dataset.item) {
        handleMenuItemClick(Number(e.target.dataset.item));
    } else if (e.target.dataset.removeitem) {
        handleRemoveItemClick(Number(e.target.dataset.removeitem));
    } else if (e.target.id === "complete-order-btn") {
        handleCompleteOrderBtnClick();
    }
});

cardForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const cardFormData = new FormData(cardForm);

    handlePayBtnClick(cardFormData.get("name"));
});

function handleMenuItemClick(menuItemId) {
    const menuItemObj = menuArray.filter(function (menuItem) {
        return menuItem.id === menuItemId;
    })[0];

    order.push(menuItemObj);

    render();
}

function handleRemoveItemClick(menuItemId) {
    // .filter method does not work because multiple items have the same id property
    order.splice(
        order.findIndex(function (e) {
            return e.id === menuItemId;
        }),
        1 // this means we remove only the first element that matches the id property
    );

    render();
}

function handleCompleteOrderBtnClick() {
    modal.style.display = "inline";
}

function handlePayBtnClick(name) {
    modal.style.display = "none";
    order = [];
    username = name;
    document.getElementById("order-list").style.display = "none";
    render();
}

function generateMenuItems() {
    let menuHtml = ``;

    menuArray.forEach(function (menuItem) {
        menuHtml += `
            <div class="menu-item">
                <div class="menu-item-inner">
                    <div class="menu-item-info">
                        <div class="menu-item-emoji">${menuItem.emoji}</div>
                        <div class="menu-item-data">
                            <p class="menu-item-title">${menuItem.name}</p>
                            <p class="menu-item-description">
                                ${menuItem.ingredients.join(", ")}
                            </p>
                            <p class="menu-item-price">$ ${menuItem.price}</p>
                        </div>
                    </div>
                    <div class="menu-item-action">
                        <button
                            class="menu-item-button"
                            id="menu-item-button"
                            data-item="${menuItem.id}"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    return menuHtml;
}

function hasMealDiscount() {
    let hasFood = false;
    let hasBeverage = false;

    order.forEach(function (orderItem) {
        if (beverageList.includes(orderItem.name)) {
            hasBeverage = true;
        } else if (foodList.includes(orderItem.name)) {
            hasFood = true;
        }
    });

    return hasFood && hasBeverage;
}

function generateOrderList() {
    let orderHtml = ``;
    let orderItemsHtml = ``;
    let totalPriceHtml = ``;
    let orderTotal = 0;

    if (order.length === 0) {
        return orderHtml;
    } else {
        order.forEach(function (orderItem) {
            orderTotal += orderItem.price;
            orderItemsHtml += `
                <div class="order-list-item">
                    <div class="order-list-item-data">
                        <p class="order-list-item-name">${orderItem.name}</p>
                        <p class="order-list-remove-btn" data-removeitem="${orderItem.id}">remove</p>
                    </div>
                    <p class="order-list-item-price">$ ${orderItem.price}</p>
                </div>
            `;
        });

        if (!hasMealDiscount()) {
            totalPriceHtml += `
                <p class="order-list-footer-price">$ ${orderTotal}</p>
            `;
        } else {
            totalPriceHtml += `
                <p class="order-list-footer-price discount">$ 
                    ${(orderTotal * orderDiscount).toFixed(2)} 
                    <span class="discount">
                        (10% discount!)
                    </span>
                </p>
            `;
        }

        orderHtml = `
            <div class="order-list-inner">
                <p class="order-list-title">Your order</p>
                ${orderItemsHtml}
            </div>
            <div class="order-list-footer">
                <p class="order-list-footer-total">Total price:</p>
                ${totalPriceHtml}
            </div>
            <button class="complete-order-btn" id="complete-order-btn">
                Complete order
            </button>
        `;

        return orderHtml;
    }
}

function generateOrderMessage() {
    let orderMessageHtml = ``;

    if (username) {
        orderMessageHtml += `
            <p>
                Thanks, ${username}! Your order is on its way!
            </p>
        `;
        document.getElementById("order-rating").style.display = "block";
    }

    return orderMessageHtml;
}

function render() {
    document.getElementById("menu-list").innerHTML = generateMenuItems();
    document.getElementById("order-list").innerHTML = generateOrderList();
    document.getElementById("order-message").innerHTML = generateOrderMessage();
}

render();
