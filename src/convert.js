const apiKeyInput = document.getElementById("api-key");
const inputLanguageSelect = document.getElementById("input-language");
const inputPromptSelect = document.getElementById("input-prompt")
const inputCodeTextarea = document.getElementById("input-code");
const outputLanguageSelect = document.getElementById("output-language");
const outputCodeTextarea = document.getElementById("output-code");
const translateBtn = document.getElementById("translate-btn");
const promptTextArea = document.getElementById("prompt");

const inputLanguages = ["COBOL", "FORTRAN", "VBA", "PASCAL"];
const outputLanguages = ["Python", "Ruby", "Swift", "Java", "C++", "C#","JavaScript"];
const inputPrompt=["Analyse","Convert","Documentation","Debug","Debug & Convert","Metadata analysis and improve"]


promptTextArea.addEventListener("keydown", getCustomPrompt);
let customPrompt="";
//Custom instruction prompt
function getCustomPrompt(event) {
  if (event.keyCode === 13) {

    const cPrompt = promptTextArea.value;
    customPrompt=cPrompt;
    // You can optionally clear the text area after capturing the prompt
    // promptTextArea.value = "";
    console.log("Custom prompt:", customPrompt);
  }
}

//set input prompt
for (const option of inputPrompt) {
  inputPromptSelect.innerHTML += `
    <option value="${option.toLowerCase()}">
      ${option}
    </option>
  `;
}

// set input language options in the select element
for (const option of inputLanguages) {
  inputLanguageSelect.innerHTML += `
    <option value="${option.toLowerCase()}">
      ${option}
    </option>
  `;
}

// set output language options in the select element
for (const option of outputLanguages) {
  outputLanguageSelect.innerHTML += `
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
  const outputLanguage = outputLanguageSelect.value;
  const inputCode = inputCodeTextarea.value;
  const inputPrompt= inputPromptSelect.value;
  if (!inputCode) {
    alert("Please enter your input code!");
    return;
  }

  if (inputLanguage === outputLanguage) {
    alert("Please select different languages!");
    return;
  }
  console.log(inputPrompt);
  if (inputPrompt=="convert"){
    const prompt=`Translate the following ${inputLanguage} code to ${outputLanguage}. Maintain the variable names and functionality and ensure all parts of the original code are converted to the target code.${customPrompt}:\n\n${inputCode}\n\n`;
    try {
      await translateCode(apiKey, prompt);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while translating the code. Check the console for more details."
      );
    }
  }
  else if(inputPrompt=="analyse"){
    const prompt = `Analyze the following ${inputLanguage} code. "Analyze the given code and check for syntax correctness, potential bugs, structural organization, efficiency considerations, security vulnerabilities, adherence to coding standards, documentation clarity, and opportunities for refactoring or optimization. Additionally, evaluate its integration and interoperability with other modules or systems. Provide detailed feedback and recommendations for improvement across these aspects to enhance the code's quality, maintainability, and reliability."${customPrompt}.:\n\n${inputCode}\n\n`;
    try {
      await analyseCode(apiKey, prompt);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while translating the code. Check the console for more details."
      );
    }
  }
  else if (inputPrompt=="documentation"){
    const prompt= `Add comments and documentation for the following ${inputLanguage} code:${customPrompt}\n\n${inputCode}\n\n`;
    try {
      await translateCode(apiKey, prompt);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while translating the code. Check the console for more details."
      );
    }
  }
  else if (inputPrompt=="debug"){
    const prompt= `The given ${inputLanguage} code has bugs and errors. "Analyze the given code and check for syntax errors, Logic errors and Runtime errors. Additionally, debug the given errors and display the functional code".${customPrompt}.:\n\n${inputCode}\n\n`;
    try {
      await translateCode(apiKey, prompt);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while translating the code. Check the console for more details."
      );
    }
  }
  else if (inputPrompt=="debug & convert"){
    let prompt= `The given ${inputLanguage} code has bugs and errors. "Analyze the given code and check for syntax errors, Logic errors and Runtime errors. Additionally, debug the given errors and display the functional code".${customPrompt}.:\n\n${inputCode}\n\n`;
    try {
      await translateCode(apiKey, prompt);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while translating the code. Check the console for more details."
      );
    }
    prompt = `Translate the following ${inputLanguage} code to ${outputLanguage}. Maintain the variable names and functionality and ensure all parts of the original code are converted to the target code..${customPrompt}.:\n\n${inputCode}\n\n`;
    try {
      await translateCode(apiKey, prompt);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while translating the code. Check the console for more details."
      );
    }
  }
  else if(inputPrompt=="metadata analysis and improve"){
    let prompt=`Analyse the given code and describe it and it's purpose and working in detail. List it's Variables, their values and the respective data types. List the control structures and flow of control. List the functions and procedures as well as the different data structures. Highlight the input/outputs. List any error handling methods as well as Libraries used.  Provide detailed feedback and recommendations for improvement across these aspects to enhance the code's quality, maintainability, and reliability..${customPrompt}:\n\n${inputCode}\n\n`;
    let newPrompt="";
    try {
      newPrompt=await analyseCode(apiKey, prompt);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while translating the code. Check the console for more details."
      );
    }
    console.log("New prompt:",newPrompt);
    prompt=`Recreate the given code based on the description and analysis given in ${outputLanguage}. Ensure functionality and improve the code's readibility, compactness, efficiency where possible based on the analysis.:\n\n${newPrompt}\n\n Recreate the given code based on the description and analysis given in ${outputLanguage}..${customPrompt}`;
    try {
      await translateCode(apiKey, prompt);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while translating the code. Check the console for more details."
      );
    }
  }
});

// use REST API to translate the code
async function translateCode(apiKey, prompt) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', apiKey);
  myHeaders.append('Content-Type', 'application/json');
  let returnValue="";
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
  outputLanguageSelect.setAttribute("disabled", "true");

  try {
    const response = await fetch('https://api.cortex.cerebrium.ai/v4/p-e72a657f/star/predict', requestOptions);
    if (!response.ok) {
      console.log(response.json());
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const result=data.result.result
    //console.log(result); // Log the entire response
    const codeRegex = /```([\s\S]*?)```/; // Regex to extract code within ''' '''
    const extractedCode = codeRegex.exec(result);
    console.log(extractedCode);
    returnValue=extractedCode;
    if (extractedCode && extractedCode.length > 1) {
      console.log(extractedCode[1]); // Log the extracted code
      outputCodeTextarea.value = extractedCode[1].trim();} // Set the translated code to the output 
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching data from the API. Check the console for more details.");
  } finally {
    // Reset UI elements
    translateBtn.innerText = "Translate Code";
    translateBtn.removeAttribute("disabled");
    inputLanguageSelect.removeAttribute("disabled");
    outputLanguageSelect.removeAttribute("disabled");
  }
  return returnValue;
}

async function analyseCode(apiKey, prompt) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', apiKey);
  myHeaders.append('Content-Type', 'application/json');
  let returnValue=""

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
      console.log(response.json());
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const result=data.result.result
    returnValue=result;
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
  return returnValue;
}