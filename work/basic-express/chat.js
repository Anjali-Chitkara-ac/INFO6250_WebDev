const users = {
    "Amit": "Amit",
    "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({username, text}) {
  // Fill in!
  //console.log('inside chat-addMessage');
  //console.log('sender is ' + username);
  //console.log('message is ' + message);
  messages.push({"sender" : username, "text" : text});

}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

