//promise chaining

const doggo_url = "https://dog.ceo/api/breeds/image/random";
console.log(doggo_url);

const doggos = document.getElementById("dog-target");

const addNewDoggo = () => {
  const promise = fetch(doggo_url);
  promise
    .then(function (result) {
      const processingPromise = result.text();
      return processingPromise;
    })
    .then(function (processedResult) {
      const dogObject = JSON.parse(processedResult);
      const img = document.createElement("img");
      img.src = dogObject.message;
      img.alt = "cute doggo";
      doggos.appendChild(img);
    })
    .catch(function (error) {
      console.log("there is an error");
    });
};
document.getElementById("dog-btn").addEventListener("click", addNewDoggo);

//async await method

const doggos2 = document.getElementById("dog-target2");

const addNewDoggo2 = async () => {
  const promise = await fetch(doggo_url);
  const processedResult = await promise.json();
  const img = document.createElement("img");
  img.src = processedResult.message;
  img.alt = "cute doggo";
  doggos2.appendChild(img);
};

document.getElementById("dog-btn2").addEventListener("click", addNewDoggo2);
