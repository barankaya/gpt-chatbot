const socket = io();

const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messages = document.getElementById("messages");

function displayMessage(role, message) {
  const div = document.createElement("div");
  div.innerHTML = `<p><b>${
    role === "user" ? "You" : "Assistant"
  }:</b> ${message}</p>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value;
  displayMessage("user", message); // Display user's message in the chat

  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return alert(error);
    }

    messageInput.value = "";
    messageInput.focus();
  });
});

socket.on("message", (message) => {
  displayMessage("assistant", message); // Display assistant's message in the chat
});