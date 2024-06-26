export async function fetchImage(prompt) {
  const payload = JSON.stringify({
    prompt: `Alice au pays des merveilles. Vous êtes Alice. ${prompt}`,
    aspect_ratio: "1:1",
    quality: "LOW",
    style: "PHOTOREALISTIC",
  });

  const host = "https://api.limewire.com";
  const pathname = "/api/image/generation";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "v1",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.LIMEWIRE_API}`,
    },
    body: payload,
  };

  const url = new URL(pathname, host)
  const response = await fetch(url, requestOptions);
  const responseData = await response.json();

  console.log(responseData)

  if (!response.ok) return null;
  if (responseData.data.length == 0) return null;

  return responseData.data[0].asset_url;
}