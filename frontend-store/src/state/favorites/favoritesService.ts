// Get favorites
const getFavorites = async (token: string) => {
  const response = await fetch("/api/user/getFavoritesId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const json = await response.json();

  if (!response.ok) {
    // save the user to local storage
    throw Error("Cannot get favorites");
  } else {
    console.log("saving");
    localStorage.setItem("favorites", JSON.stringify(json.favorites));
  }

  console.log(json);

  return json.favorites;
};

const authService = {
  getFavorites,
};

export default authService;
