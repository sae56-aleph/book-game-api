import('node-fetch').then(fetch => {
    async function main() {
      const payload = JSON.stringify({
        prompt: "A cute baby sea otter",
        aspect_ratio: "1:1"
      });
  
      const host = "https://api.limewire.com";
      const pathname = "/api/image/generation";
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Version': 'v1',
          'Accept': 'application/json',
          'Authorization': 'Bearer <ici>'
        },
        body: payload
      };
  
      const response = await fetch.default(host + pathname, requestOptions);
      
      if (!response.ok) {
        throw new Error('La requête a échoué avec le statut ' + response.status);
      }
  
      const responseData = await response.json();
  
      if (Object.keys(responseData).length === 0) {
        throw new Error('La réponse JSON est vide');
      }
  
      console.log(responseData);
    }
  
    main().catch(error => console.error(error));
  });
  