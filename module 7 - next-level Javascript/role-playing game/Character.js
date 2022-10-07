import { getDiceRollArray, getDicePlaceholderHtml } from './utils.js'

/*Challenge
1. Create a property called maxHealth INSIDE Character that 
stores the maximum health a character can have.
2. Create an arrow function called getPercentage OUTSIDE 
Character which takes two parameters, remainingHealth and 
maximumHealth. getPercentage should return the % of 
maximumHealth that is remaining.
3. To test, call getPercentage from within the takeDamage method
and log out the result. 
**hint.md for help!!**
*/


function Character(data) {
    Object.assign(this, data)
    this.diceArray = getDicePlaceholderHtml(this.diceCount)
    
    this.getDiceHtml = function () {
        this.currentDiceScore = getDiceRollArray(this.diceCount);
        this.diceArray = this.currentDiceScore.map((num) =>
            `<div class="dice">${num}</div>`).join("")
    }
    
    this.takeDamage = function(attackScoreArray){  
        const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
        this.health -= totalAttackScore
        if (this.health <= 0){
            this.dead = true  
            this.health = 0
        } 
    }

    this.getCharacterHtml = function () {
        const { elementId, name, avatar, health, diceCount } = this;

        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                <div class="dice-container">
                    ${this.diceArray}
                </div>
            </div>`
    }
}

export default Character