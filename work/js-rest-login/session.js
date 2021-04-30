const sessions = {};
const isValidSession = function(sid) {
  return sessions[sid];
};
const validateUsername = function(username) {
  const errors = [];
  const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
  if( clean !== username ) {
    // TODO: should give error codes, not text messages
    errors.push('username contained disallowed characters');
  }
  if(!username) {
    errors.push('username was empty');
  }

  return errors.lengths ? errors : '';
};
const createSession = function(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
    items: [
      {
        task: 'have a real list',
        done: false,
      },
    ],
  };
  return sid;
};

const sessionWeb = {
  sessions,
  isValidSession,
  validateUsername,
  createSession
}
module.exports = sessionWeb;