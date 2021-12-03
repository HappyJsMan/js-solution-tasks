// tablica kolorow
let suits = ['H', 'C', 'D', 'S'];
// tablica figur
let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
// tablica pobranych figur
let suitArray = [];
// tablica pobranych kolorow
let rankArray = [];

// tworzenie talii 52 kart
function createDeck() {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            // console.log(ranks[ranksCounter] + suits[suitCounter]);
            deck.push(ranks[j] + suits[i]);
        }
    }
    return deck;
}

// tasowanie talii 52 kart
function shuffleDeck(deck) {
    for (let i = 0; i < 52; i++) {
        let tempCard = deck[i];
        let randomIndex = Math.floor(Math.random() * 52);
        deck[i] = deck[randomIndex];
        deck[randomIndex] = tempCard;
    }
}

// potasowana talia kart
let mixDeck = createDeck();
shuffleDeck(mixDeck);
// console.log(mixDeck);

// pobieramy 5 pierwszych kart z potasowanej talii
let fiveCardHand = mixDeck.splice(0, 5);
console.log("Pobrane     karty: ", fiveCardHand);

// sortowanie pobranych 5 kart od największej do najmniejszej figury
function sorted(fiveCardHand) {
    let sortedHand = [];
    for (let i = 0; i < ranks.length; i++) {
        for (let j = 0; j < fiveCardHand.length; j++) {
            if (ranks[i] === fiveCardHand[j].charAt(0)) {
                sortedHand.push(fiveCardHand[j])
            }
        }
    }
    return sortedHand;
}

// posortowane pobrane karty
let sortedFiveCardHand = sorted(fiveCardHand);
// // 5 wybranych kart do testownia gry
// let sortedFiveCardHand = ['T♠', 'J♠', 'Q♠', 'K♠', 'A♠'];sor
console.log("Posortowane karty: ", sortedFiveCardHand);

// zamiana tablicy pobranych 5 kart na string
// let fiveCardHandString = fiveCardHand.join(' ');
// console.log(fiveCardHandString);

// tworzenie tablicy kolorow oraz tablicy figur dla pobranych posortowanych kart
function suitAndRank(sortedFiveCardHand) {
    for (i = 0; i < sortedFiveCardHand.length; i++) {
        rankArray.push(sortedFiveCardHand[i].charAt(0))
        suitArray.push(sortedFiveCardHand[i].charAt(1))
    }
}
suitAndRank(sortedFiveCardHand);

// zliczanie powtarzających się kolorow w tablicy pobranych kolorow
function countSuites(suitArray) {
    let suitCount = {};
    suitArray.forEach(function (x) {
        suitCount[x] = (suitCount[x] || 0) + 1;
    });
    return suitCount;
}
let cS = countSuites(suitArray);
// console.log(cS);

// zliczanie powtarzających się figury w tablicy pobrancyh figur
function countRanks(rankArray) {
    let rankCount = {};
    rankArray.forEach(function (x) {
        rankCount[x] = (rankCount[x] || 0) + 1;
    });
    return rankCount;
}
let cR = countRanks(rankArray)
// console.log(cR);

// poker
function isFlush() {
    if (Object.keys(cS).find(key => cS[key] === 5)) {
        return true;
    } else {
        return false;
    }
}

// strit
function isStraight() {
    let index = ranks.indexOf(rankArray[0])
    let ref = ranks.slice(index, index + 5).join("")
    let section = rankArray.slice(0).join("")
    if (section === "TJQKA" && section === ref) {
        return "ROYALSTRAIGHT";
    } else if (section === "A2345" || section === ref) {
        return "STRAIGHT";
    } else {
        return "FALSE";
    }
}

// para
function pairs() {
    return Object.keys(cR).filter((key) => cR[key] === 2).length
}

// wynik
function result() {
    if (isFlush() === true && isStraight() === "ROYALSTRAIGHT") {
        console.log('Royal Flush')
    } else if (isFlush() === true && isStraight() === "STRAIGHT") {
        console.log("Straight Flush")
    } else if (Object.keys(cR).find(key => cR[key] === 4)) {
        console.log("Four of a Kind")
    } else if (Object.keys(cR).find(key => cR[key] === 3) && pairs() === 2) {
        console.log("Full House")
    } else if (isFlush() === true) {
        console.log("Flush")
    } else if (isStraight() === "STRAIGHT") {
        console.log("Straight")
    } else if (Object.keys(cR).find(key => cR[key] === 3)) {
        console.log("Three of a Kind")
    } else if (pairs() === 2) {
        console.log("Two Pair")
    } else if (pairs() === 1) {
        console.log("Pair")
    } else {
        console.log('High Card', rankArray[rankArray.length - 1])
    }
}

return result();