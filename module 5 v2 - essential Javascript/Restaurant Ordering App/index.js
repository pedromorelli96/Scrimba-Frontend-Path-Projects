import { menuArray } from "./data.js";

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

function render() {
    document.getElementById("menu-list").innerHTML = generateMenuItems();
}

render();
