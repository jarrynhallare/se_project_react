const baseUrl = "http://localhost:3001";

const headers =  {
      "Content-Type": "application/json",
    };

const handleServerResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`Error: ${response.status}`);
};

export const getItems = () => 
  fetch(`${baseUrl}/items`, {headers}).then(handleServerResponse);
   