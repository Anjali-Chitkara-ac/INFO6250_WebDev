const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
          <link href="/style.css" rel="stylesheet">
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ul class="messages">
    <p> Chat History </p>`+
      Object.values(chat.messages).map( message => `
      <li> 
        <div class="message-bar">
          <span class="message">${message.sender} : ${message.text}</span>
        </div>
      </li>
    `).join('')+
      `</ul>`;
  },
  getUserList: function(chat) {
    return `<ul class="users"> 
    <p> Participants </p>` +
    Object.values(chat.users).map( user => `
      <li> 
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    // Fill in!
     return  `
      <form action="/chat" method="POST" >
        <label>
        <input type="hidden" value="Amit" name="username" placeholder="Enter here"/>
        </label>
        <label>
          Your Message <input name="text" placeholder="Enter here"/>
        </label>
        <label>
          <button type="submit">Send Message</button>
        </label>
      </form>`;

  }
};
module.exports = chatWeb;
