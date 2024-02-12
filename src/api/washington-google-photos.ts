import axios from 'axios';
import { ImageResponse } from '../types/image-response-type';



// Define the web app URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyqSKlNGM7Ls2yFOIwyEz2k2Z7M0L2KAVZIIcBv-sZN3Qp2ZUOthSf5SuSq_ndwgH52/exec';



// Function to fetch data from the web app URL and extract image IDs
const fetchWashingtonImageIds = async () => {
    try {
        //Fetch data from the web app URL
        const response = (await axios.get(WEB_APP_URL));
        if(response.status !== 200) {
            throw new Error('Fetch Script URL Data Failed')
        } 
        const data = response.data;
       

        if(data.length === 0) {
            throw new Error('Fetch successful but empty array returned');
        } else {
            console.log('Data: ', data)

            console.log('Items fetched, ' + data.length + ' items found')
        }
        const imageIds: string[] = [];
        data?.forEach((item: { book_url: string }) => {
            const urlSplit = item.book_url.split('/d/');
            const imageId = urlSplit[1].split('/view')[0];
            imageIds.push(imageId);
        });

        // let data: ImageResponse[] | null = null;
        // const response = (await fetch(WEB_APP_URL));
        // if(!response.ok) {
        //  throw new Error('Fetch data failed')
        // } else {
        //     data = JSON.parse(await response.text())
        // }


        // console.log('Response: ', response);
        // console.log('Data: ', data)
        // Extract image IDs from the URLs
        // const imageIds: string[] = [];
        // data?.forEach((item) => {
        //     const urlSplit = item.split('/d/');
        //     const imageId = urlSplit[1].split('/view')[0];
        //     imageIds.push(imageId);
        // });
       

        //Print the extracted image IDs
        console.log(imageIds);
        return imageIds;

        // console.log(data);
        // return data;
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

export default fetchWashingtonImageIds;

// Call the function to fetch and extract image IDs
//fetchAndExtractImageIds();