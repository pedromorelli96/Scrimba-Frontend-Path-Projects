import { menuArray } from "./data.js";

let order = [];

document.addEventListener("click", function (e) {
    if (e.target.dataset.item) {
        handleMenuItemClick(Number(e.target.dataset.item));
    } else if (e.target.dataset.removeitem) {
        handleRemoveItemClick(Number(e.target.dataset.removeitem));
    } else if (e.target.id === "complete-order-btn") {
        console.log(e.target.id);
    }
});

function handleMenuItemClick(menuItemId) {
    const menuItemObj = menuArray.filter(function (menuItem) {
        return menuItem.id === menuItemId;
    })[0];

    order.push(menuItemObj);

    render();
}

function handleRemoveItemClick(menuItemId) {
    // .filter method does not work because multiple
    // items have the same id property
    order.splice(
        order.findIndex(function (e) {
            return e.id === menuItemId;
        }),
        1 // this means we remove only the first element that matches the id property
    );

    render();
}

function generateMenuItems() {
    let menuHtml = ``;

    menuArray.forEach(function (menuItem, index) {
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

function generateOrderList() {
    let orderHtml = ``;
    let orderItemsHtml = ``;
    let orderTotal = 0;

    if (order.length === 0) {
        return orderHtml;
    } else {
        order.forEach(function (orderItem, index) {
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

        orderHtml = `
            <div class="order-list-inner">
                <p class="order-list-title">Your order</p>
                ${orderItemsHtml}
            </div>
            <div class="order-list-footer">
                <p class="order-list-footer-total">Total price:</p>
                <p class="order-list-footer-price">$ ${orderTotal}</p>
            </div>
            <button class="complete-order-btn" id="complete-order-btn">
                Complete order
            </button>
        `;

        return orderHtml;
    }
}

function render() {
    document.getElementById("menu-list").innerHTML = generateMenuItems();
    document.getElementById("order-list").innerHTML = generateOrderList();
}

render();
