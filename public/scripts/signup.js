
(() => {
  const form = document.getElementById("credentialsForm");
  const all_inputs = document.getElementsByClassName("credentialsField credentialsSubmit");
  const error_text = document.getElementById("credentialsError");

  //Try logging in. Returns true if successful, false if not.
  const sendSignUp = async (data) => {
    let res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    let json_res = await res.json();

    if (!res.ok) {
      if (res.status === 400 && json_res.error === "User already exists") {
        error_text.innerText = `There is already a user with that username.`;
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
      data.first_name = data.first_name.trim();
      if (data.first_name === "")
        throw `Please enter your entire name.`;

      data.last_name = data.last_name.trim();
      if (data.last_name === "")
        throw `Please enter your entire name.`;

      data.cc_info = data.cc_info.trim();
      if (data.cc_info === "") data.cc_info = null;

      data.shipping_address = data.shipping_address.trim();
      if (data.shipping_address === "") data.shipping_address = null;

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
      //Finally, redirect to user profile
      if (success)
        window.location.href = "/profile";
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