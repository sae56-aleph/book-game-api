import('node-fetch').then(fetch => {
    async function main() {
      const payload = JSON.stringify({
        prompt: "Alice au pays des merveilles. Vous êtes Alice. Vous vous allongez dans l’herbe et contemplez le ciel. Les étoiles scintillent intensément, formant des constellations étranges. Vous reconnaissez Orion, mais il a une jambe de plus. La Grande Ourse ressemble à un chat endormi. Soudain, une étoile filante traverse le ciel. Que souhaitez-vous ?",
        aspect_ratio: "1:1",
        quality: "LOW",
        style: "PHOTOREALISTIC",
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
      
      if (response.status === 200) {
        const responseData = await response.json();
        if (responseData.data.length > 0) {
          return responseData.data[0].asset_url;
        } else {
          throw new Error('La réponse ne contient pas de données d\'actif');
        }
      } else {
        return null;
      }
    }
  
    main().then(assetUrl => {
      console.log(assetUrl);
    }).catch(error => console.error(error));
  });
