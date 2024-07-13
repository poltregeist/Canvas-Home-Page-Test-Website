Hereconst player = GetPlayer();

//You should change the following 3 variables. Make sure that the text is enclosed by quotation marks.
const systemRequest = "You are a language coach who helps people write in conversational English. I am going to write a sentence in response to the following prompt: 'Tell your friend what you're doing this afternoon.' Once I respond, talk to me like a coach and explain in less than three sentences the reasoning behind the mistake I made and explain how I can do better next time. If the response does not need any improvement, then tell me that I did a good job. Here is my response:"
const userInputVariable = "TextEntry"
const aiOutputVariable = "aiResponse"

const userEntry = player.GetVar(userInputVariable)
const auth = "Bearer " + player.GetVar("token");

function sendRequest() {
    fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": systemRequest
              },
              {
                "role": "user",
                "content": userEntry
              }
            ]
        })
    }).then(response => {
        return response.json()
    }).then(data=>{
        console.log(data)
        let aiText = data.choices[0].message.content
        player.SetVar(aiOutputVariable, aiText)
    }).catch(error => {
            console.log("Error: " + error)
        });
}
sendRequest()