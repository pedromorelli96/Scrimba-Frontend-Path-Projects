class Dog {
    constructor(data) {
        Object.assign(this, data);
    }

    setMatchStatus(bool) {
        this.hasBeenLiked = bool;
        this.hasBeenSwiped = true;
    }

    getBadgeHtml() {
        const badgeSrc = this.hasBeenLiked
            ? "images/badge-like.png"
            : "images/badge-nope.png";

        return `
            <img class="badge-img" src="${badgeSrc}">
        `;
    }

    getDogHtml() {
        const { name, avatar, age, bio } = this;
        return `
            <div class="feature-suggestion">
                <div class="dog-info">
                    <h4> ${name}, ${age} </h4>
                    <div class="dog-bio">
                        ${bio}
                    </div>
                </div>
                <img class="dog-img" src="${avatar}">
                <div class="badge" id="badge">
                    ${this.getBadgeHtml()}
                </div>
            </div>`;
    }
}

export default Dog;
