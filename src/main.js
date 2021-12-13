import './styles/style.scss'

let contentBlock = document.querySelector('.content')
let scrollImage = document.querySelector('.img-block-wrapper__img')
let scrollImageInfoWrapper = document.querySelector('.img-block-wrapper__info')
let scrollImageYear = document.querySelector('.info__year')
let scrollImageEvent = document.querySelector('.info__place')
let allContentBlocks = document.querySelectorAll('.content-inner')
let contentButtonsWrappers = document.querySelectorAll('.content__buttons')
let contentButtons = document.querySelectorAll('.content__buttons-button')
let filledProgressLine = document.querySelector('.progress-bar__line-filled')
let smileGood = document.querySelector('.smiles__good')
let smileBad = document.querySelector('.smiles__bad')
let contentButtonWrappers = document.querySelectorAll('.content__buttons-wrapper')

let startProgressLine = 10 // Процентов
let progressLineStep = (100 - startProgressLine) / contentButtonsWrappers.length
let actualProgressWidth = startProgressLine

let imagesData = [
    { 'imageLink': 'https://img.the-village.ru/IXZGOoCMB449ndjy_Nd02ZdXhzc_PqodPY5bHsseC9s/q:88/plain/2021/12/05/Mask-Group-2-_0.jpg', 'year': '2017', 'event': 'КолАЭС' },
    { 'imageLink': 'https://img.the-village.ru/eCpfdHOTmEL22tlekFBDyYcuR5kuI47rcWRPvM57UAY/q:88/plain/2021/12/05/Mask-Group-3-_0.jpg', 'year': '2017', 'event': 'ИЦАЭ' },
    { 'imageLink': 'https://img.the-village.ru/w-fuGhzXXCt0DtWvE8ImOwrSKfiCgTkoXfJxle86GJI/q:88/plain/2021/12/05/Mask-Group-4-_0.jpg', 'year': '2018', 'event': 'ИЦАЭ ВК Фест' },
    { 'imageLink': 'https://img.the-village.ru/d6lcGETd50yI9eJEcgpEwxKtAK7AKAA05d2hpNz80Lc/q:88/plain/2021/12/05/Mask-Group-5-_0.jpg', 'year': '2019', 'event': 'ИЦАЭ Старкон' },
    { 'imageLink': 'https://img.the-village.ru/EdoGwUo-CNCq5h6SIFLtlFMNIDDXlV7qJ0tLDkRzwnI/q:88/plain/2021/12/05/Mask-Group-6-_0.jpg', 'year': '2019', 'event': 'ЯПрофи' },
    { 'imageLink': 'https://img.the-village.ru/o_M8KVHEFoVUVvOLx7QYsmsvB-AaM1d07Wflhfv7ZJ0/q:88/plain/2021/12/05/Mask-Group-7-_0.jpg', 'year': '2020', 'event': 'Территория смыслов' },
    { 'imageLink': 'https://img.the-village.ru/Lx-AV7G2JDoQ6wEkp_9tSELB2XeJwfyzWHETvWrazJM/q:88/plain/2021/12/05/Mask-Group-8-_0.jpg', 'year': '2021', 'event': 'Сириус' },
    { 'imageLink': 'https://img.the-village.ru/gK5SX6li5hAmSpb6DvUS0bKLiK971PAqeucmbXGXphI/q:88/plain/2021/12/05/Mask-Group-9-.jpg', 'year': '2021', 'event': 'Выпуск' },
]

let blocksHeight = {};
let buttonsWrapperTopOffset = [];
window.onload = () => {
    filledProgressLine.style.width = `${startProgressLine}%`
    // let allContentBlocks = document.querySelectorAll('.content-inner')
    let counter = 0
    allContentBlocks.forEach((element, num) => {
        let bodyRect = document.body.getBoundingClientRect();
        let elemRect = element.getBoundingClientRect();
        let offset = elemRect.top - bodyRect.top;
        if (element.dataset.image) {
            blocksHeight[counter++] = offset
        }
    });

    contentButtonWrappers.forEach(el => {
        let bodyRect = document.body.getBoundingClientRect();
        let elemRect = el.getBoundingClientRect();
        let offset = elemRect.top - bodyRect.top;

        buttonsWrapperTopOffset.push(offset)
    })
    console.log(buttonsWrapperTopOffset);
};

let actualButtonsWrapper = 0
let actualImageData = 0;
document.addEventListener('scroll', async () => {
    let contentBlockOffsetTop = contentBlock.offsetTop
    let documentOffsetTop = document.documentElement.scrollTop
    if (documentOffsetTop >= contentBlockOffsetTop) {
        contentBlock.style.backgroundAttachment = 'fixed';
    } else {
        contentBlock.style.backgroundAttachment = '';
    }
    if (+documentOffsetTop >= +Object.values(blocksHeight)[actualImageData] && documentOffsetTop > +Object.values(blocksHeight)[actualImageData + 1]) {
        if (actualImageData < Object.values(blocksHeight).length) {
            actualImageData++
            scrollImage.style.opacity = '0%'
            scrollImageInfoWrapper.style.opacity = '0%'
            await sleep(400)
            scrollImage.src = imagesData[actualImageData].imageLink
            scrollImageYear.innerText = imagesData[actualImageData].year
            scrollImageEvent.innerText = imagesData[actualImageData].event
            scrollImageInfoWrapper.style.opacity = '100%'
            scrollImage.style.opacity = '100%'
        }
    }
    if (+documentOffsetTop <= +Object.values(blocksHeight)[actualImageData] && documentOffsetTop < +Object.values(blocksHeight)[actualImageData - 1]) {
        if (actualImageData > 0) {
            actualImageData--
            scrollImage.style.opacity = '0%'
            scrollImageInfoWrapper.style.opacity = '0%'
            await sleep(400)
            scrollImage.src = imagesData[actualImageData].imageLink
            scrollImageYear.innerText = imagesData[actualImageData].year
            scrollImageEvent.innerText = imagesData[actualImageData].event
            scrollImageInfoWrapper.style.opacity = '100%'
            scrollImage.style.opacity = '100%'
        }
    }
})
document.addEventListener('onmousewheel', (e) => {
    e.preventDefault()
    console.log('mousewheel');
})

contentButtons.forEach((element) => {
    element.addEventListener('click', () => {
        if (!element.classList.contains('selected-button') && !element.classList.contains('disabled-button') && !element.parentNode.parentNode.parentNode.classList.contains('blocked')) {
            element.classList.add('selected-button')
            let selectedButtonsWrapper = Array.from(element.parentNode.children)
            selectedButtonsWrapper.forEach(button => {
                if (!button.classList.contains('selected-button')) {
                    button.classList.add('disabled-button')
                }
            })
            if (element.dataset.answer === 'true') {
                actualProgressWidth = parseInt(filledProgressLine.style.width)
                filledProgressLine.style.width = `${actualProgressWidth + progressLineStep}%`
            }
            smileAnimation(filledProgressLine, element.dataset.answer)

            let canChangeOpacity = true
            allContentBlocks.forEach((block, num) => {
                if (block.classList.contains('blocked') && canChangeOpacity) {
                    block.classList.remove('blocked')
                    Array.from(block.children).forEach(child => {
                        child.classList.contains('content__buttons-wrapper') ? canChangeOpacity = false : canChangeOpacity = true
                    })
                }
            })
            actualButtonsWrapper++
        }
    })
})
allContentBlocks.forEach((block, num) => {
    if (num !== 0) {
        block.classList.add('blocked')
    }
})



async function smileAnimation(el, answer) {
    if (answer === 'true') {
        el.style.backgroundColor = '#085014'
        smileGood.style.fill = '#085014'
    } else {
        el.style.backgroundColor = '#7B0919'
        smileBad.style.fill = '#7B0919'
    }
    await sleep(1000)
    el.style.backgroundColor = '#fff'
    smileGood.style.fill = 'rgba(255, 255, 255, 0)'
    smileBad.style.fill = 'rgba(255, 255, 255, 0)'
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}







///////////////////////////////
