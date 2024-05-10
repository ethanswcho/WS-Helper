import axios from 'axios';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const decklogCode = document.getElementById("decklog") as HTMLInputElement
const printButton = document.getElementById("printBtn") as HTMLButtonElement
const printValue = document.getElementById("enteredDecklog") as HTMLOutputElement
const AxiosInstance = axios.create();

function printEnteredValue(): void {
    printValue.textContent = decklogCode.value;
}

/*
function decklogToWeissSim(): string {
    console.log(decklogCode.value);
    AxiosInstance.get(decklogCode.value, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => {
        const html = response.data;
        console.log(html);
    })
    return "";
}
*/

async function decklogToWeissSim() {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage();
    const document = await page.goto(decklogCode.value, {
        waitUntil: "domcontentloaded"
    });
    const cards = await page.$("card-controller");
    console.log(cards);
    return "";
}

printButton.addEventListener("click", printEnteredValue);
printButton.addEventListener("click", decklogToWeissSim);