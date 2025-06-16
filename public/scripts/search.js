/*
  Browser script for the search functionality. Handles all search inputs,
  converting data into search terms and making an AJAX request to the backend
  server.
*/

(() => {
  const product_bar = document.getElementById("searchBar");
  const category_buttons = document.getElementsByClassName("searchCategoryButton");
  const brand_bar = document.getElementById("searchBrandBar");
  const store_bar = document.getElementById("searchStoreBar");

  let selected_category = null; //Keep track of state
  const all_options = document.getElementsByClassName("searchOption");
  const default_text = document.getElementById("searchResultsDefault");
  const search_list = document.getElementById("searchResultsList");
  const item_template = document.getElementById("searchResultsItemTemplate");
  const search_amount_text = document.getElementById("searchAmountText");
  const search_amount_number = document.getElementById("searchAmountNumber");

  //Retrieve data from ALL inputs
  const getData = () => {
    let data = {};

    let product_name = product_bar.value.trim();
    if (product_name !== "") data.product_name = product_name;

    if (selected_category !== null) data.category = selected_category.innerText;

    let brand_name = brand_bar.value.trim();
    if (brand_name !== "") data.brand_name = brand_name;

    let store_name = store_bar.value.trim();
    if (store_name !== "") data.store_name = store_name;

    return data;
  };

  //Send search data, and update the list of items
  const sendData = async (data) => {
    let res = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok)
      throw `Fetch failure: ${res.status} ${res.statusText}`;

    return res.json();
  };

  //Populate the search list with items
  const renderItems = (items) => {
    default_text.style.display = "none";
    search_amount_text.hidden = false;
    search_amount_number.innerText = `${items.length}`;
    search_amount_number.hidden = false;
    search_list.replaceChildren(); //Clear data

    for (let item of items) {
      let new_node = item_template.content.cloneNode(true);
      new_node.querySelector(".searchResultsItem").href = `/product/${item.product_id}`;
      new_node.querySelector(".searchItemImage").src = "/public/images/no-image.jpg"; //PLACEHOLDER
      new_node.querySelector(".searchItemTitle").innerText = item.product_name;
      new_node.querySelector(".searchItemInfo").innerText = `${item.category} | ${item.brand_name}`;
      new_node.querySelector(".searchItemPrice").innerText = `$${item.price}`;
      new_node.querySelector(".searchItemStock").innerText = `${item.availability} in stock.`;
      search_list.appendChild(new_node);
    }
  };

  //For all text-based inputs (search bars)
  let defaultListener = (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    let data = getData();
    if (Object.keys(data).length === 0) return;

    //Freeze all input
    for (let option of all_options) option.disabled = true;

    sendData(data)
    .then((items) => {
      renderItems(items);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      //Unfreeze input
      for (let option of all_options) option.disabled = false;
    });
  };


  product_bar.addEventListener("keydown", defaultListener);

  for (let category of category_buttons) {
    category.addEventListener("click", (_) => {
      if (selected_category !== null) {
        selected_category.classList.remove("searchCategoryButtonSelected");
        if (selected_category !== category) {
          category.classList.add("searchCategoryButtonSelected");
          selected_category = category;
        } else
          selected_category = null;
      } else {
        category.classList.add("searchCategoryButtonSelected");
        selected_category = category;
      }

      let data = getData();
      if (Object.keys(data).length === 0) return;

      for (let option of all_options) option.disabled = true;

      sendData(data)
      .then((items) => {
        renderItems(items);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        for (let option of all_options) option.disabled = false;
      });
    })
  }

  brand_bar.addEventListener("keydown", defaultListener);
  store_bar.addEventListener("keydown", defaultListener);
})();