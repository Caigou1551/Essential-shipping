
(() => {
  const form = document.getElementById("credentialsForm");
  const all_inputs = document.getElementsByClassName("credentialsField credentialsSubmit");
  const error_text = document.getElementById("credentialsError");

  //Try logging in. Returns true if successful, false if not.
  const sendLogin = async (data) => {
    let res = await fetch("/store/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    let json_res = await res.json();

    if (!res.ok) {
      if (res.status === 400 && json_res.error === "Cannot get store") {
        error_text.innerText = `The username or password entered is incorrect.`;
        error_text.style.display = "inline";
        return false;
      }

      error_text.innerText = `An unknown error occurred. Try again later.`;
      error_text.style.display = "inline";
      console.error(json_res);
      return false;
    }

    return true;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Get submitted data
    let data = Object.fromEntries((new FormData(event.target)).entries());

    try {
      data.username = data.username.trim();
      if (data.username === "")
        throw `Please enter your username.`;

      data.password = data.password.trim();
      if (data.password === "")
        throw `Please enter your password.`;
    } catch (e) {
      error_text.innerText = e;
      error_text.style.display = "inline";
      return;
    }

    //Freeze all input
    for (let input of all_inputs) input.disabled = true;
    sendLogin(data)

    .then((success) => {
      //Finally, redirect to store profile
      if (success)
        window.location.href = "/store/profile";
    })

    .catch((e) => {
      console.error(e);
    })

    .finally(() => {
      //Unfreeze
      for (let input of all_inputs) input.disabled = false;
    });
  });
})();