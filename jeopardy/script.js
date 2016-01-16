/** TO-DO:
* End
* Timer
* Load Jeopardy from JSON
* Start page
* Randomize Daily Double
* Improve formatting webpage too
*/

var currentMode = null,
    pointsAdd = 0,
    wager = 0,
    usedQs = [],
    teamEdit = false,
    alphabet = "abcdefghijklmnopqrstuvwxyz",
    colors = ["#00FFFF", "#00FF00", "#FF00FF", "#ADD8E6", "#C0C0C0", "#95B9C7", "#6698FF", "#CDFFFF", "#ADDFFF", "#7FFFD4", "#52D017", "#99C68E", "#7FE817", "#5EFB6E", "#8AFB17", "#CCFB5D", "#B1FB17", "#FFFF00", "#FFF380", "#FFE87C", "#EDDA74", "#F5F5DC", "#FFDB58", "#FFD801", "#FDD017", "#E9AB17", "#FFA62F", "#FFCBA4", "#E8A317", "#D4A017", "#FFA500", "#F87217", "#FF8040", "#F9966B", "#FF7F50", "#FF0000", "#E77471", "#E8ADAA", "#FCDFFF", "#FAAFBE", "#F778A1", "#F660AB", "#F52887", "#F433FF", "#A74AC7", "#8E35EF", "#8467D7", "#C45AEC", "#E238EC", "#E9CFEC", "#E3E4FA", "#FEFCFF", "#FFFFFF"],
    teams = [],
    finalWagers = [],
    jeopardy = {
        "categories": [
            {
                "name": "MUSIC TO MY EARS",
                "questions": [
                    {
                        "value": 200,
                        "question": "20. You are presented with an instrument that has a mouthpiece and a reed that, when blown into, makes a shrill sound. This instrument is BEST classified as a(n)",
                        "choices": [
                            "Aerophone",
                            "Idiophone",
                            "Membranophone",
                            "Chordophone",
                            "Electrophone"
                        ],
                        "answer": "Aerophone",
                        "dailyDouble": false
                    },
                    {
                        "value": 400,
                        "question": "31. How many shrutis are possible in an octave?",
                        "choices": [
                            "16",
                            "18",
                            "20",
                            "22",
                            "24"
                        ],
                        "answer": "22"
                    },
                    {
                        "value": 600,
                        "question": "What term is used to describe the first beat of the <i>tala</i> cycle?",
                        "choices": [
                            "<i>Bam</i>",
                            "<i>Tam</i>",
                            "<i>Sam</i>",
                            "<i>Ram</i>",
                            "<i>Dam</i>"
                        ],
                        "answer": "<i>Sam</i>"
                    },
                    {
                        "value": 800,
                        "question": "39. Which of the following instruments is NOT a mebranophone?",
                        "choices": [
                            "<i>Dholak</i>",
                            "<i>Dhol</i>",
                            "<i>Mridangam</i>",
                            "<i>Tabla</i>",
                            "<i>Sarangi</i>"
                        ],
                        "answer": "<i>Sarangi</i>"
                    },
                    {
                        "value": 1000,
                        "question": "28. All of the following statements about ragas are true EXCEPT",
                        "choices": [
                            "They are typically accompanied by a specific rhythm",
                            "They use specific pitches in a scale",
                            "Some of the pitches of the raga are designated as \"resting notes,\" which have structural importance",
                            "The pitches of a raga are used in specific phrasings and contours",
                            "Certain pitches in the raga require delicate slides and microtones"
                        ],
                        "answer": "They are typically accompanied by a specific rhythm"
                    }
                ]
            },
            {
                "name": "ECON 101",
                "questions": [
                    {
                        "value": 200,
                        "question": "33. GDP = Consumption + Government Spending + Net Exports + _____.",
                        "choices": [
                            "Impact",
                            "Income",
                            "Investment",
                            "Importants",
                            "Interest"
                        ],
                        "answer": "Investment"
                    },
                    {
                        "value": 400,
                        "question": "19. At what age does the U.S. Bureau of Labor Statistics start classifying a person as employed, unemployed, or out of the labor force in order to determine the national unemployment rate?",
                        "choices": [
                            "14",
                            "15",
                            "16",
                            "17",
                            "18"
                        ],
                        "answer": "16"
                    },
                    {
                        "value": 600,
                        "question": "16. The positive relationship between price and quantity supplied is called the",
                        "choices": [
                            "Law of supply",
                            "Expectation rate",
                            "Law of Demand",
                            "Equilibrium rate",
                            "Law of consumption"
                        ],
                        "answer": "Law of supply"
                    },
                    {
                        "value": 800,
                        "question": "10. A change in all of the following factors will cause a shift in the supply curve EXCEPT",
                        "choices": [
                            "Expectations",
                            "Technology",
                            "Number of buyers",
                            "Input prices",
                            "Number of sellers"
                        ],
                        "answer": "Number of buyers"
                    },
                    {
                        "value": 1000,
                        "question": "20. The area above the point at which the positive supply curve and negative demand curves intersect is called the",
                        "choices": [
                            "Consumer ratio",
                            "Excess demand",
                            "Consumer benefit",
                            "Equilibrium point",
                            "Surplus"
                        ],
                        "answer": "Surplus"
                    }
                ]
            },
            {
                "name": "INDIAN ECONOMICS",
                "questions": [
                    {
                        "value": 200,
                        "question": "3-12. India's current prime minister is",
                        "choices": [
                            "Jawaharlal Nehru",
                            "Earl Mountbatten",
                            "Mohandas Gandhi",
                            "Indira Gandhi",
                            "Narendra Modi"
                        ],
                        "answer": "Narendra Modi"
                    },
                    {
                        "value": 400,
                        "question": "39. What percentage of the population in India lives on less than $2 per day as of 2010?",
                        "choices": [
                            "68.8%",
                            "91.3%",
                            "52.2%",
                            "11.1%",
                            "43.6%"
                        ],
                        "answer": "68.8%"
                    },
                    {
                        "value": 600,
                        "question": "49. India's agricultural sector is highly susceptible to shocks, which result in shortages, because",
                        "choices": [
                            "The climate in India is not suited to the cultivation of mass-consumed foods",
                            "India's agricultural supply chain is highly problematic",
                            "The adoption of modern farming techniques has backfired and destroyed many farms",
                            "Massive nation-wide labor riots frequently disrupt agricultural production",
                            "Coal shortages ensure that rural farms cannot function efficiently"
                        ],
                        "answer": "India's agricultural supply chain is highly problematic"
                    },
                    {
                        "value": 800,
                        "question": "1-20. The gap between measures of India's and China's populations",
                        "choices": [
                            "is smaller if the youth population is not counted",
                            "will close in a few decades",
                            "has decreased dramatically in the past decade",
                            "will widen dramatically in the future",
                            "is rapidly increasing"
                        ],
                        "answer": "Will close in a few decades",
                        "dailyDouble": true
                    },
                    {
                        "value": 1000,
                        "question": "2-37. In the early years after independence, India had a large",
                        "choices": [
                            "rate of economic growth",
                            "trade deficit",
                            "trade surplus",
                            "number of oil reserves",
                            "store of foreign currency"
                        ],
                        "answer": "Trade deficit"
                    }
                ]
            },
            {
                "name": "SEPOYS AND THE REBELLION",
                "questions": [
                    {
                        "value": 200,
                        "question": "22. The EIC recruited Sepoy soldiers rather than European soldiers for all of the following reasons EXCEPT they were",
                        "choices": [
                            "Cheaper than European soldiers",
                            "Accustomed to the environment in which they were serving",
                            "Acclimated to the terrain and geography of the region",
                            "Able to successfully draw these soldiers from particular populations",
                            "Faithful and dutiful to the British"
                        ],
                        "answer": "Faithful and dutiful to the British"
                    },
                    {
                        "value": 400,
                        "question": "25. Through the summer of the Mutiny, the Sepoy soldiers were joined by all of the following EXCEPT",
                        "choices": [
                            "Disaffected and dislocated landlords",
                            "Former princes who lost everything to the British",
                            "British soldiers who defected after mistreatment in the EIC military",
                            "Peasants who were frustrated with British rule",
                            "Merchants who were put out of business by the EIC"
                        ],
                        "answer": "British soldiers who defected after mistreatment in the EIC military"
                    },
                    {
                        "value": 600,
                        "question": "28. All of the following were outcomes of the Sepoy Mutiny EXCEPT",
                        "choices": [
                            "The appointment of Indian military leaders in the EIC army",
                            "An increase in the ratio of European to Indian soldiers in the EIC army",
                            "The increase in diversity of soldiers hired to fight in the EIC army",
                            "An increased racism against the Indians in the mind of the British",
                            "The destruction and barricading of the city of Shahjahanabad"
                        ],
                        "answer": "The appointment of Indian military leaders in the EIC army"
                    },
                    {
                        "value": 800,
                        "question": "31. The connection between the Sepoy Mutiny and the growing nineteenth-century British Empire is the British",
                        "choices": [
                            "Army gained confidence after subduing the Sepoys and became aggressors elsewhere",
                            "Needed to regain money lost in India so they began exploiting other overseas colonies",
                            "Used reparation taxes the Indians paid to finance the growth of their overseas colonies",
                            "Used guilty Sepoy rebels to form new armies to fight and conquer new colonies",
                            "Used colonial bases to train military leaders to return to India to prevent future mutinies"
                        ],
                        "answer": "Used reparation taxes the Indians paid to finance the growth of their overseas colonies"
                    },
                    {
                        "value": 1000,
                        "question": "32. A significant development in Indian cities after the Sepoy Mutiny was the",
                        "choices": [
                            "Abolishment of the caste system",
                            "Racial division between \"black\" and \"white\" neighborhoods",
                            "Rise in social status of the \"untouchables\"",
                            "Stationing of military troops in major cities throughout the country",
                            "Dispersion of British residents for fear of further mutiny and rebellion"
                        ],
                        "answer": "Racial division between \"black\" and \"white\" neighborhoods"
                    }
                ]
            },
            {
                "name": "INDIAN HISTORY",
                "questions": [
                    {
                        "value": 200,
                        "question": "11. When the Seven Years' War played out in India, all of the following factors helped the English beat the French EXCEPT the",
                        "choices": [
                            "French were in heavy debt to the great banking house of Jagat Seth",
                            "English had full support of the Indian government across the entire continent",
                            "French had control of only one Indian city from which to draw resources",
                            "English had control of several Indian cities from which to draw resources",
                            "French had expanded too rapidly, causing them to go into substantial debt to Jagat Seth"
                        ],
                        "answer": "English had full support of the Indian government across the entire continent"
                    },
                    {
                        "value": 400,
                        "question": "12. India, on the eve of the Battle of Plassy, can BEST be characterized as",
                        "choices": [
                            "Being under complete control of the English, save for French control of Pondicherry",
                            "Having Indian figureheads who answered to English authorities in their de facto capital at Calcutta",
                            "Having an equally distributed mix of Indian, English, French and Dutch authorities",
                            "Being divided into several zones, all with varying degrees of Indian and English authority",
                            "Having complete autonomy and free from European interference"
                        ],
                        "answer": "Being divided into several zones, all with varying degrees of Indian and English authority"
                    },
                    {
                        "value": 600,
                        "question": "19. The thing the EIC spent the most money on while maintaining their control over India was",
                        "choices": [
                            "Investing in rural farms to expand their sizes",
                            "Promoting Anglicization throughout the Indian caste system",
                            "Maintaining a large military to subdue rebellions",
                            "Improving trade routes for easier transport of goods",
                            "Paying bribes to the Nawabs"
                        ],
                        "answer": "Maintaining a large military to subdue rebellions"
                    },
                    {
                        "value": 800,
                        "question": "43. Of all the problems Nehru faced when composing the Indian Constitution, the biggest challenge was/were",
                        "choices": [
                            "Debate over the partition between Indian and Pakistan",
                            "Recently violent religious differences within India and its neighboring country",
                            "Aspects of British colonialism that was persisting within independent India",
                            "Majority of the Indians' lack of access to technology and education",
                            "Extraordinary diversity that spanned the newly independent India"
                        ],
                        "answer": "Extraordinary diversity that spanned the newly independent India"
                    },
                    {
                        "value": 1000,
                        "question": "50. The two most important events during Rao's administration were",
                        "choices": [
                            "Destruction of the Babri Masjid, and the suppression of riots throughout north India and Bombay",
                            "The opening of some industries to private hands, and the destruction of the Babri Masjid",
                            "The reformation of land distribution, and liberalization of the Indian economy",
                            "Liberalization of the Indian economy, and the destruction of the Babri Masjid",
                            "The birth of consumer culture in India, and the destruction of the Babri Masjid"
                        ],
                        "answer": "Liberalization of the Indian economy, and the destruction of the Babri Masjid"
                    }
                ]
            },
            {
                "name": "ECOLOGY",
                "questions": [
                    {
                        "value": 200,
                        "question": "35. What is an autotrophic organism?",
                        "choices": [
                            "a top predator",
                            "a critical organism at the center of a food web",
                            "an organism that causes ecological succession",
                            "a producer of organic compounds",
                            "an organism that eats only plants"
                        ],
                        "answer": "a producer of organic compounds"
                    },
                    {
                        "value": 400,
                        "question": "3. Which of the following is an example of an ecological community?",
                        "choices": [
                            "an ant colony",
                            "a beehive",
                            "all of the humans on Earth",
                            "a group of seagulls fighting over food scraps",
                            "the various plants and animals found in a tidal pool"
                        ],
                        "answer": "the various plants and animals found in a tidal pool"
                    },
                    {
                        "value": 600,
                        "question": "4. What do ecologists call a patchwork of multiple communities and ecosystems?",
                        "choices": [
                            "abiotic environment",
                            "landscape",
                            "biome",
                            "biosphere",
                            "population"
                        ],
                        "answer": "landscape"
                    },
                    {
                        "value": 800,
                        "question": "16. Ecosystem diversity if BEST described as",
                        "choices": [
                            "diversity of genes within a species",
                            "diversity of genes within an ecosystem",
                            "diversity of ecological communities in an area",
                            "a measure of the number of species in an ecosystem",
                            "the change in an ecosystem over time"
                        ],
                        "answer": "diversity of ecological communities in an area"
                    },
                    {
                        "value": 1000,
                        "question": "14. Which of the following statements is TRUE about deciduous forests?",
                        "choices": [
                            "They occur only in the tropics.",
                            "They are most likely to be found on mountainous islands.",
                            "Light availability to underbrush changes throughout the year.",
                            "The soil has a permanently frozen layer.",
                            "They contain the highest biodiversity of any forest type."
                        ],
                        "answer": "Light availability to underbrush changes throughout the year."
                    }
                ]
            }
        ],
        "final": {
            "category": "INDIAN CITIES",
            "question": "What is the most populous city in India?",
            "answer": "Mumbai"
        },
        "randDailyDouble": 0
    };
    
// Shamelessly stolen from http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function $(id) { // shortcut for document.getElementById
    return document.getElementById(id);
}

/*function changeBackground() {
    document.body.style.background = "#0A1186"; // to change background color of page
}*/

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function setWager(id) {
    wager = +$("dailyDouble").value;
    if (wager < 5) {
        alert("Wager must be greater than or equal to $5!");
        return;
    }
    showQuestion(id);
}

function handleDailyDouble(id) {
    var category = jeopardy.categories[Math.floor(id / 10)],
        question = category.questions[id % 10];
    $("display").innerHTML = "<table style='width:100%; height:90%' class='game'><th><img src='daily_double.png' onclick='setWager(" + id + ")'/><br/><br/><font color='#E5915C' size=5>Enter Wager:&nbsp;$&nbsp;</font><input type='number' id='dailyDouble' step='100' min='0' max='17800' value='" + question.value + "'/></th></table>";
}

function showQuestion(id) {
    if (usedQs.indexOf(id) !== -1 && currentMode === "board") {
        return;
    }
    if (currentMode === "board") {
        usedQs.push(id);
    }
    currentMode = "question";
    var category = jeopardy.categories[Math.floor(id / 10)],
        question = category.questions[id % 10],
        out = ["<table style='width:100%; height:90%' class='game'><tr><td onclick='showAnswer(\"" + id + "\")'>"];
    if (question.dailyDouble === true && wager === 0) {
        handleDailyDouble(id);
        return;
    };
    if (!question.hasOwnProperty("choices") && !Array.isArray(question.choices)) {
        out.push("<center><strong><font color='#FFF2C6' size=7>" + question.question + "</font></strong></center>");
    } else {
        out.push("<strong><font color='#FFF2C6' size=7>" + question.question + "</font></strong><br/>");
        /*var size = 6, string = "";
        if (question.choices.join("").length > 56 * question.choices.length - 10) {
            size = 6;
        }*/
        for (var i = 0; i < question.choices.length; i++) {
            var choice = question.choices[i];
            /*if (size === 7 && choice.length > 56) {
                var j = choice.substring(0, 56).lastIndexOf(" ");
                choice = choice.substring(0, j) + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + choice.slice(j);
            }*/
            if (choice.length > 91) {
                var j = choice.substring(0, 91).lastIndexOf(" ");
                choice = choice.substring(0, j) + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + choice.slice(j);
            }
            out.push("<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b><font color='#FFF2C6' size=6>" + alphabet[i] + ". " + choice + "</font></b>");
        }
    }
    out.push("</td></tr></table>");
    $("display").innerHTML = out.join("");
}

function editPoints(id, sign) {
    var value;
    if (id === "final") {
        value = 1;
    } else {
        var category = jeopardy.categories[Math.floor(id / 10)],
            question = category.questions[id % 10];
        value = question.value;
        if (question.dailyDouble === true) {
            value = wager;
        }
    }
    pointsAdd = sign === "-" ? -value : value;
}

function addPoints(team) {
    if (currentMode === "answer") {
        teams[team].points += pointsAdd;
        updateScoreBoard();
        createJeopardyBoard();
    } else if (currentMode === "final_answer") {
        teams[team].points += finalWagers[team] * pointsAdd;
        updateScoreBoard();
    }
}

function showAnswer(id) {
    currentMode = "answer";
    var category = jeopardy.categories[Math.floor(id / 10)],
        question = category.questions[id % 10],
        answer = question.answer,
        out = ["<table style='width:100%; height:90%' class='game'><tr style='height:90%'><td colspan=2 onclick='createJeopardyBoard()'>"];
    out.push("<center><strong><font color='#FFF2C6' size=7>");
    if (question.hasOwnProperty("choices") && Array.isArray(question.choices)) {
        var choices = question.choices.map(function (choice) { return choice.toLowerCase(); }),
            i = choices.indexOf(answer.toLowerCase());
        if (i !== -1) {
            out.push(alphabet[i] + ". ");
        }
    }
    out.push(answer + "</font></strong></center></td></tr>");
    out.push("<tr><th onclick='editPoints(" + id + ", \"+\")'><font color='green' size=5><b>+</b></font></th>");
    out.push("<th onclick='editPoints(" + id + ", \"-\")'><font color='red' size=5><b>&#8210;</b></font></th></tr>"); // Dash
    out.push("</table>");
    $("display").innerHTML = out.join("");
}

function setFinalWagers() {
    if (finalWagers.length !== 0) {
        finalWagers = [];
    }
    for (var t = 0; t < teams.length; t++) {
        finalWagers.push($("final" + t).value);
    }
}

function handleFinalJeopardy(num) {
    var question = jeopardy["final"],
        out = "<table style='width:100%; height:90%' class='game'><tr style='height:90%'><td colspan=2 onclick='handleFinalJeopardy({0})'><center><strong><font color='#FFF2C6' size=7>{1}</font></strong></center></td></tr>{2}</table>";
    switch (num) {
        case 0:
            currentMode = "final_confirm";
            $("display").innerHTML =  out.format(num + 1, "All questions have been answered!<br/>Click to proceed to Final Jeopardy!", "");
            break;
        case 1:
            currentMode = "final_wager";
            var wagers = [];
            for (var t = 0; t < teams.length; t++) {
                var team = teams[t];
                wagers.push("<font color='" + team.color + "' size=5>" + team.name + ":</font> <input type='number' id='final" + t + "' step='100' min='0' value='0'/><br/>");
            }
            wagers.push("<br/><a href='javascript:;' style='color:#E5915C; font-size:0.57em;' onclick='handleFinalJeopardy(2)'>Continue</a>");
            $("display").innerHTML = out.replace("onclick='handleFinalJeopardy({0})", "").format("", "CATEGORY: " + question.category + "<br/><br/><font size=6 color='#B0CFFC'>Make your wagers!</font><br/>" + wagers.join(""), "");
            break;
        case 2:
            currentMode = "final_question";
            setFinalWagers();
            $("display").innerHTML = out.format(num + 1, question.question, "");
            break;
        case 3:
            currentMode = "final_answer";
            $("display").innerHTML =  out.format(num + 1, question.answer, "<tr><th onclick='editPoints(\"final\", \"+\")'><font color='green' size=5><b>+</b></font></th><th onclick='editPoints(\"final\", \"-\")'><font color='red' size=5><b>&#8210;</b></font></th></tr>");
            break;
        default:
            end();
    };
}

function end() {
    alert("This function is not coded yet");
}

function nextRound() {
    if (jeopardy.hasOwnProperty("final") && typeof currentMode === "string" && currentMode.indexOf("final") === -1) { 
        handleFinalJeopardy(0);
    } else {
        end();
    }
}

function back() {
    var lastQ = usedQs[usedQs.length - 1];
    switch (currentMode) {
        case "board":
        case "final_confirm":
            if (lastQ !== undefined) {
                showAnswer(lastQ);
            } else {
                createJeopardyBoard();
            }
            break;
        case "question":
            usedQs.splice(-1, 1);
            createJeopardyBoard();
            break;
        case "answer":
            showQuestion(lastQ);
            break;
        case "final_wager":
            handleFinalJeopardy(0);
            break;
        case "final_question":
            handleFinalJeopardy(1);
            break;
        case "final_answer":
            handleFinalJeopardy(2);
            break;
        case "end":
            if (jeopardy.hasOwnProperty("final")) { 
                handleFinalJeopardy(3);
            } else {
                showAnswer(lastQ);
            }
            break;
        default:
            alert("Game has not started yet!");
    }
}

function createJeopardyBoard() {
    currentMode = "board";
    wager = 0;
    var out = ["<table style='width:100%; height:90%' class='game'><tr>"],
        categories = jeopardy.categories,
        width = Math.floor(100 / categories.length);
    if (usedQs.length === categories.length * categories[0].questions.length) {
        nextRound();
        return;
    }
    for (var c = 0; c < categories.length; c++) {
        var color = "#0A1186";
        for (var q = 0; q < categories[0].questions.length; q++) {
            var id = c * 10 + q;
            if (usedQs.indexOf(id) === -1) {
                color = "#B0CFFC";
                break;
            }
        }
        out.push("<th style='width:" + width + "%'><font color='" + color + "' size=5>" + categories[c].name + "</font></th>");
    }
    out.push("</tr>");
    for (var i = 0; i < categories[0].questions.length; i++) { // each category should have the same amount of questions
        out.push("<tr>");
        for (var j = 0; j < categories.length; j++) {
            var id = j * 10 + i,
                value = categories[j].questions[i].value,
                color = usedQs.indexOf(id) !== -1 ? "#0A1186" : "#E5915C";
            out.push("<th onclick='showQuestion(" + id + ")'><font color='" + color + "' size=10>$" + value + "</font></th>");
        }
        out.push("</tr>");
    }
    out.push("</table>");
    $("display").innerHTML = out.join("");
}

function editTeams() {
    if (teamEdit === false) {
        teamEdit = true;
        var out = ["<table style='width:100%; height:10%'><tr>"];
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i];
            if (team.color === "#000000") {
                var c = rand(0, colors.length);
                team.color = colors[c];
                colors.splice(c, 1);
            }
            out.push("<th><input id='team" + i + "' value='" + team.name + " | " + team.color + "'></input></th>");
        }
        out.push("<th style='width:2%'><a href='javascript:;' style='color:green; text-decoration: none' onclick='addTeam()'>+</a></th>");
        out.push("<th style='width:13%' rowspan=2>");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='back()'>Back</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='skip()'>Skip</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='end()'>End</a><br/>");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='editTeams()'>Edit</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='test_eval()'>Eval</a></th></tr><tr>");
        for (var i = 0; i < teams.length; i++) {
            var color = teams[i].points < 0 ? "#FF0000" : "#DBFEF8";
            out.push("<td><center><input id='points" + i + "' value='" + teams[i].points + "'></input></center></td>");
        }
        out.push("<th><a href='javascript:;' style='color:red; text-decoration: none;' onclick='removeTeam()'>&#8210;</a></th>");
        out.push("</tr></table>");
        $("score").innerHTML = out.join("");
    } else {
        teamEdit = false;
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i],
                name, color,
                input = $("team" + i).value, 
                points = parseInt($("points" + i).value, 10);
            var lastIndex = input.lastIndexOf(" | ");
            if (lastIndex !== -1) {
                name = input.substring(0, lastIndex);
                color = input.slice(lastIndex + 3);
            } else {
                name = input;
                color = null;
            }
            if (team.name !== name) {
                team.name = name;
            } 
            if (color && team.color !== color) {
                team.color = color;
            } 
            if (team.points !== points) {
                team.points = points;
            }
        }
        updateScoreBoard();
    }
}

function addTeam() {
    var defaultTeam = {
        "name": "Team " + (teams.length + 1),
        "color": "#000000",
        "points": 0
    };
    teams.push(defaultTeam);
    if (teamEdit !== false) {
        teamEdit = false;
        editTeams();
    }
}

function removeTeam() {
    teams.splice(teams.length - 1, 1);
    if (teamEdit !== false) {
        teamEdit = false;
        editTeams();
    }
}

function test_eval() {
    var data = prompt("Eval [use alert() to see result]", "");
    try {
        var res = eval(data);
    } catch (err) {
        alert("Error in eval: " + err);
    }
}

function updateScoreBoard() {
    var out = ["<table style='width:100%; height:10%'><tr>"];
    for (var i = 0; i < teams.length; i++) {
        var team = teams[i];
        if (team.color === "#000000") {
            team.color = colors[rand(0, colors.length)];
        }
        out.push("<th onclick='addPoints(" + i + ")'><font color='" + team.color + "'>" + team.name + "</font></th>");
    }
    out.push("<th style='width:15%' rowspan=2>");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='back()'>Back</a> &nbsp;&nbsp;&nbsp;");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='nextRound()'>Skip</a> &nbsp;&nbsp;&nbsp;");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='end()'>End</a><br/>");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='editTeams()'>Edit</a> &nbsp;&nbsp;&nbsp;");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='test_eval()'>Eval</a></th></tr><tr>");
    for (var i = 0; i < teams.length; i++) {
        var color = teams[i].points < 0 ? "#FF0000" : "#DBFEF8";
        out.push("<td><center><font color='" + color + "'>" + teams[i].points + "</font></center></td>");
    }
    out.push("</tr></table>");
    $("score").innerHTML = out.join("");
}

function onLoad() {
    for (var x = 0; x < 3; x++) {
        addTeam();
    }
    createJeopardyBoard();
    updateScoreBoard();
}