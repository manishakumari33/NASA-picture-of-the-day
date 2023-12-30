document.addEventListener('DOMContentLoaded', () => {
    async function getCurrentImageOfTheDay() {
      try {
        const currentDate = new Date().toISOString().split('T')[0];
        const apiKey = 'LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
  
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        displayImage(data);
      } catch (error) {
        console.error('Error fetching current image:', error.message);
      }
    }
  
    async function getImageOfTheDay(date) {
      try {
        const apiKey = 'LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        displayImage(data);
        saveSearch(date);
        addSearchToHistory(date);
      } catch (error) {
        console.error('Error fetching image for the selected date:', error.message);
      }
    }
  
    function saveSearch(date) {
      let searches = JSON.parse(localStorage.getItem('searches')) || [];
      searches.push(date);
      localStorage.setItem('searches', JSON.stringify(searches));
    }
  
    function addSearchToHistory(date) {
      const historyList = document.getElementById('search-history');
      const listItem = document.createElement('li');
      listItem.textContent = date;
      historyList.appendChild(listItem);
  
      listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
      });
    }
  
    function displayImage(data) {
      const container = document.getElementById('current-image-container');
      container.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
      `;
    }
  
    document.getElementById('search-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const inputDate = document.getElementById('search-input').value;
  
      if (inputDate) {
        getImageOfTheDay(inputDate);
      }
    });
  
    getCurrentImageOfTheDay();
  });