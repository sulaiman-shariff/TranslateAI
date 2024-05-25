const apiKeyInput = document.getElementById("api-key");
const inputLanguageSelect = document.getElementById("input-language");
const inputCodeTextarea = document.getElementById("input-code");
const outputCodeTextarea = document.getElementById("output-code");
const translateBtn = document.getElementById("translate-btn");
const inputLanguages = ["COBOL", "FORTRAN", "VBA", "PASCAL"];

// set input language options in the select element
for (const option of inputLanguages) {
  inputLanguageSelect.innerHTML += `
    <option value="${option.toLowerCase()}">
      ${option}
    </option>
  `;
}

// allow copying of the outputted code
outputCodeTextarea.addEventListener("click", async () => {
  const outputCode = outputCodeTextarea.value;

  try {
    await navigator.clipboard.writeText(outputCode);
    alert("Code has been copied to clipboard!");
  } catch (error) {
    console.error("Error copying code to clipboard", error);
  }
});

// handle translate button click
translateBtn.addEventListener("click", async () => {
  const apiKey = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiJwLWU3MmE2NTdmIiwiaWF0IjoxNzE1NjkwMTY2LCJleHAiOjIwMzEyNjYxNjZ9.cXkf3P-fZaXE5F69RbgocwDqwUfRFeoh_taDx_hF1SueDl8xD2JHs4lNLt7dHkb25ZfhX1j__tJBg95TIYnSX8vCbbAWiwecYk9ziB1Y9vkJ7YfhJ0o3-JXr_vefkVJC4tngQPqwnkCt23mEnACSQeMpubS6NRXrbJkyeMn0ftlXDSVZLE8J6ZnFJ5KmX6qxzEnre_BdG_GY8TaIrVAKubSi5a2pvU7lFCYeBm0Uq_vWAgbvR8stQQuQa4-rIAuMbb2Kax939iSohwPzLNKnrSc1SlOQ2E4OOaa4nvhjUO9TSmEO3Az42vS6n5HKAiXWBTNXoUzTN2yV4zWyH0BXGg';
  const inputLanguage = inputLanguageSelect.value;
  const inputCode = inputCodeTextarea.value;

  if (!apiKey) {
    alert("Please enter your API Key!");
    return;
  }

  if (!inputCode) {
    alert("Please enter your input code!");
    return;
  }

  let prompt = `Analyze the following ${inputLanguage} code. "Analyze the given code and check for syntax correctness, potential bugs, structural organization, efficiency considerations, security vulnerabilities, adherence to coding standards, documentation clarity, and opportunities for refactoring or optimization. Additionally, evaluate its integration and interoperability with other modules or systems. Provide detailed feedback and recommendations for improvement across these aspects to enhance the code's quality, maintainability, and reliability.":\n\n${inputCode}\n\n`;

  try {
    await translateCode(apiKey, prompt);
  } catch (error) {
    console.error(error);
    alert(
      "An error occurred while translating the code. Check the console for more details."
    );
  }
});

// use REST API to translate the code
async function translateCode(apiKey, prompt) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', apiKey);
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    "prompt": prompt
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'manual'
  };

  // Modify UI elements to indicate request is pending
  translateBtn.innerHTML = `<i class="fa fa-circle-notch fa-spin"></i>`;
  translateBtn.setAttribute("disabled", "true");
  inputLanguageSelect.setAttribute("disabled", "true");

  try {
    const response = await fetch('https://api.cortex.cerebrium.ai/v4/p-e72a657f/star/predict', requestOptions);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const result=data.result.result
    console.log(result);
    outputCodeTextarea.value = result; // Set the analysed code to the output 
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching data from the API. Check the console for more details.");
  } finally {
    // Reset UI elements
    translateBtn.innerText = "Analyse Code";
    translateBtn.removeAttribute("disabled");
    inputLanguageSelect.removeAttribute("disabled");
  }
}