export default function Question(props) {

    // Source for shuffle array algorithm:
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    function getScrambledAnswers() {
        const possibleAnswers = [...props.incorrect_answers, correct_answer]
        return (shuffle(possibleAnswers))
    }

    return (
        <div className="question">
            <p className="question-category">{props.category}</p>
            <h3 className="question-question">{props.question}</h3>
            <div className="question-answers">
                {getScrambledAnswers().map(answer => 
                    <button className="answer">{answer}</button>    
                )}
            </div>
        </div>
    );
}