// Register user
const register = async (email: string, password: string) => {
  const response = await fetch("/api/user/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (response.ok) {
    // save the user to local storage
    console.log("saving");
    localStorage.setItem("user", JSON.stringify(json));
  } else {
    throw new Error(json.error);
  }

  console.log(json);

  return json;
};

// Login user
const login = async (email: string, password: string) => {
  const response = await fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (response.ok) {
    // save the user to local storage
    console.log("saving");
    localStorage.setItem("user", JSON.stringify(json));
  } else {
    throw new Error(json.error);
  }

  console.log(json);

  return json;
};

const logout = () => {
  localStorage.removeItem("user");
  console.log("saving");
  localStorage.setItem("isLoggedOut", JSON.stringify(true));
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
