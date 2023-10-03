const axios = require("axios");
const cheerio = require("cheerio");

// Description: Extracts summary data from a URL
const extractSummaryData = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract text content from specific HTML elements
    const title = $('title').text(); // Extract the page title
    const paragraphs = []; // Extract text content from paragraphs, you can modify this based on your needs
    $('p').each((index, element) => {
      paragraphs.push($(element).text());
    });

    // Create an object with extracted data
    const summaryData = {
      title,
      paragraphs,
    };

    // console.log("Summary data:", summaryData);

    return summaryData;
  } catch (error) {
    console.error("Error extracting summary data:", error);
    return null;
  }
};

module.exports = extractSummaryData;
