
(() => {
  const form = document.getElementById("credentialsForm");
  const all_inputs = document.getElementsByClassName("credentialsField credentialsSubmit");
  const error_text = document.getElementById("credentialsError");

  //Try logging in. Returns true if successful, false if not.
  const sendSignUp = async (data) => {
    let res = await fetch("/store/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    let json_res = await res.json();

    if (!res.ok) {
      if (res.status === 400 && json_res.error === "Store already exists") {
        error_text.innerText = `There is already a store with that username.`;
        error_text.style.display = "inline";
        return false;
      }

      error_text.innerText = `An unknown error occurred. Try again later.`;
      error_text.style.display = "inline";
      console.error(json_res);
      return false;
    }

    return true;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Get submitted data
    let data = Object.fromEntries((new FormData(event.target)).entries());

    try {
      data.store_name = data.store_name.trim();
      if (data.store_name === "")
        throw `Please enter your store's name.`;

      data.location = data.location.trim();
      if (data.location === "")
        throw `Please enter your store's location.`;

      data.username = data.username.trim();
      if (data.username === "")
        throw `Please enter your desired username.`;

      data.password = data.password.trim();
      if (data.password === "")
        throw `Please enter your desired password.`;
    } catch (e) {
      error_text.innerText = e;
      error_text.style.display = "inline";
      return;
    }

    //Freeze all input
    for (let input of all_inputs) input.disabled = true;
    sendSignUp(data)

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