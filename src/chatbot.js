document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    let messageLog = ""; // Storing the appended user and bot messages.
    const apiKey='Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiJwLWQ1OTAxOTFiIiwiaWF0IjoxNzE2NjU2NzM1LCJleHAiOjIwMzIyMzI3MzV9.U-wCLb8T_Ml6eC9T2OdCBQz605oYctUHGwQNG5uGaDE2txqSmoxzXIz9DhLccw3UDfA4TaZJkNvQ_Mn5zrZgrhp6H9eev1sUs6XobxCe8g5xh9j9TPuLMy6yIo3Odz_IHGJszQuAemsiIQV5Nj7YrjbPLRu8ptY0rKutOmppzRMnwsyh9nBrynzfW6PwIpPQB0foXb1sLT6dlRABvxmCLfhPJC8bXmunE1HWosIrm269P92IBZuKcqBl3-wfZWKYnYeqn0dkfAgdDn-i0KIf5N8P-v0UPdlQ9Q4MrE0nGBZoVOf6-7iab_CSJzAecuAPKMvYWcum2LDcAV5q5IKW7w';
    // Append a message to the chat box
    function appendMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.className = className;
        messageElement.innerText = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Send a message and get a response from the API
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage(message, 'user-message');
        messageLog += `User-Message: ${message}\n\n`;
        userInput.value = '';

        try {
            await getResponseFromAPI(messageLog);
        } catch (error) {
            console.error(error);
            alert("An error occurred while sending the input. Check the console for more details.");
        }
    }

    // Get a response from the API
    async function getResponseFromAPI(messageLog) {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', apiKey);
        myHeaders.append('Content-Type', 'application/json');
        
        console.log(messageLog);
        const raw = JSON.stringify({
            "prompt": messageLog
          });        

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'manual'
        };

        try {
            const response = await fetch('https://api.cortex.cerebrium.ai/v4/p-d590191b/chat/predict', requestOptions);
            if (!response.ok) {
                console.log(await response.json());
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            messageLog += `Bot-Message: ${data.result.result}\n\n`;
            appendMessage(data.result.result, 'bot-message');
        } catch (error) {
            console.error(error);
            alert("An error occurred while fetching data from the API. Check the console for more details.");
        }
    }

    // Send message on Enter key press
    window.handleKeyPress = function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };
});
