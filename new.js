const axios = require("axios");

function cleanObject(obj) {
  let itemsRemoved = 0;

  const cleanRecursively = (data) => {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value === "N/A" || value === "-" || value === "") {
        delete data[key];
        itemsRemoved++;
      } else if (Array.isArray(value)) {
        data[key] = value.filter(
          (item) => item !== "N/A" && item !== "-" && item !== ""
        );

        itemsRemoved += value.length - data[key].length;
      } else if (typeof value === "object" && value !== null) {
        cleanRecursively(value);
      }
    });
  };

  cleanRecursively(obj);
  obj.items_removed = itemsRemoved;
  return obj;
}

axios
  .get("https://example.com/xyz")
  .then((response) => {
    const cleanedObject = cleanObject(response.data);
    console.log(JSON.stringify(cleanedObject));
  })
  .catch((error) => {
    console.error("Error fetching the data:", error);
  });


  query {
  book(ISBN: "0743273567") {
    title
    author
    published
    publisher
    pages
    genres
    reviews(limit: 1) {
      author
      date
      content
    }
  }
}