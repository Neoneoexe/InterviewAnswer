const endpoint =
  "https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1";

async function fetchData() {
  try {
    // Fetch data from API
    const response = await fetch(endpoint);
    const data = await response.json();

    // Filter products based on domestic or imported
    const domesticProducts = data.filter(function(product) {
      return product.domestic === true;
    });

    const importedProducts = data.filter(function(product) {
      return product.domestic === false;
    });

    console.log(". Domestic");

    // Sort and log each domestic product's name, price, description, and weight
    domesticProducts
      .sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .forEach(function(product) {
        console.log(`... ${product.name}`);
        console.log(`Price: $${product.price}`);
        console.log(`${product.description.slice(0, 10)}...`);
        console.log(`Weight: ${product.weight ? product.weight : "N/A"}`);
      });

    // Log imported products
    console.log(". Imported");

    // Sort and log each imported product's name, price, description, and weight
    importedProducts
      .sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .forEach(function(product) {
        console.log(`... ${product.name}`);
        console.log(`Price: $${product.price}`);
        console.log(`${product.description.slice(0, 10)}...`);
        console.log(`Weight: ${product.weight ? product.weight : "N/A"}`);
      });

    // Calculate total cost of domestic and imported products
    const domesticCost = domesticProducts.reduce(function(total, product) {
      return total + parseFloat(product.price);
    }, 0);

    const importedCost = importedProducts.reduce(function(total, product) {
      return total + parseFloat(product.price);
    }, 0);

    // Log total cost and count of domestic and imported products
    console.log(`Domestic cost:\n$${domesticCost.toFixed(1)}`);
    console.log(`Imported cost:\n$${importedCost.toFixed(1)}`);
    console.log(`Domestic count: ${domesticProducts.length}`);
    console.log(`Imported count: ${importedProducts.length}`);
  } catch (error) {
    // Log error message if there is an error fetching data
    console.log("Error fetching data:", error);
  }
}

// Call fetchData function with endpoint parameter
fetchData(endpoint);
