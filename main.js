let header = document.querySelector('.header');
let page = document.querySelector('.pop-section .page')
let exploreBtn = document.querySelector('.middle p')
let HadithSection = document.querySelector('.hadith')

    exploreBtn.addEventListener('click', ()=>{
        HadithSection.scrollIntoView({
            behavior : 'smooth'
        })
    })


    let MainHeader = document.querySelector('[data-filter="main"]')
    MainSection = document.querySelector('.main')
    MainHeader.addEventListener('click', ()=>{
        MainSection.scrollIntoView({behavior : 'smooth'})
    })

// SCROLL 
document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;
    window.scrollY > 100 ? header.classList.add('active') : header.classList.remove('active')
});


// hadith Change 
let hadithContainer = document.querySelector('.hadithContainer');
    prev = document.querySelector('.buttons .prev')
    next = document.querySelector('.buttons .next')
    number = document.querySelector('.buttons .number')
    var hadithIndex = 0

function hadithChanger(){
NumberOfHadith = document.querySelector('.Hadithnumber')
    fetch('https://api.hadith.sutanlab.id/books/muslim?range=1-300')
    .then(response => response.json())
    .then(data =>{ 
        let Hadith = data.data.hadiths;
        next.addEventListener('click', ()=>{
            hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
            changeNumber();   
        })
        prev.addEventListener('click', ()=>{
            hadithIndex == 0 ? hadithIndex = 299 : hadithIndex-1;
            changeNumber();   
        })
        function changeNumber() {
            hadithContainer.innerHTML = Hadith[hadithIndex].arab;
            NumberOfHadith.innerHTML = `300 - ${hadithIndex+1}`;  
        } 
        changeNumber()
    })
}
hadithChanger()

///////////
let hadithHeader = document.querySelector('[data-filter="hadith"]')
    HadithSection = document.querySelector('.hadith')
    hadithHeader.addEventListener('click', ()=>{
        HadithSection.scrollIntoView({behavior : 'smooth'})
    })

// leatreture Section 
const leatreture = document.querySelector('.leatreture')
var oo = true;
leatreture.addEventListener('click', ()=>{
    if(oo){
        let iframe = document.querySelector('.video-sec iframe')
        iframe.src = "https://www.youtube.com/embed/kYaFq_5FTdE"
        oo = false
    }else{
        let iframe = document.querySelector('.video-sec iframe')
        iframe.src = "https://www.youtube.com/embed/631L-aGzfAE"
        oo = true
    }
})

//////
let LetreatureHeader = document.querySelector('[data-filter="leatreture"]')
    LetreatureSection = document.querySelector('.leatreture')
    LetreatureHeader.addEventListener('click', ()=>{
        LetreatureSection.scrollIntoView({behavior : 'smooth'})
    })
////







// QURAN section 
let surahName = document.querySelector('.pop-section h4')
      console.log(surahName);

function Quran(surahNumber){
    let quranContainer = document.querySelector('.quran .container')
    fetch(`http://api.alquran.cloud/v1/meta`)
    .then(Response => Response.json())
    .then(data =>{
        // console.log(data.data.surahs.references);
        let surah = data.data.surahs.references
        if(surah){
        for(let i = 0; i < 113; i++){   
            quranContainer.innerHTML += 
                `<div class="surah" onclick="popUP(${i})">
                    <p class="arabic" name="${i}">${surah[i].name}</p>
                    <p>${surah[i].englishName}</p>
                </div>`
        }
      }
    })
}
Quran()


// Quran popUp
var surahNUM ;
function popUP(value){
    document.querySelector('.pop-section').style.display = "block";
    surahNUM = value ;
    page.innerHTML = `<span class="aya"></span><img src="./img/comma.png" style="display:inline-block;">`;
    makeIT()   
}

// makeIT();
function makeIT(){
let page = document.querySelector('section .page')
fetch(`https://api.alquran.cloud/v1/surah/${surahNUM+1}/quran-uthmani`)
    .then(Response => Response.json())
    .then(data =>{
      console.log(data.data)
      surahName.innerHTML = `${data.data.name}`;
      if(surahName){console.log('hrllo');}
        for(let i=0 ; i<data.data.ayahs.length; i++){
        page.innerHTML += 
        `<span class="aya" >${data.data.ayahs[i].text}</span><img src="./img/comma.png" style="display:inline-block;">`;
      }
    })  
}
// console.log(surahNUM);


let X = document.querySelector('.pop-section .x')

X.addEventListener('click', ()=>{
    document.querySelector('.pop-section').style.display = "none";
    page.innerHTML = 
        `<span class="aya"></span><img src="./img/comma.png" style="display:inline-block;" alt="">`;
})



// 
let quranHeader = document.querySelector('[data-filter="quran"]')
    quranSection = document.querySelector('.quran')
    quranHeader.addEventListener('click', ()=>{
        quranSection.scrollIntoView({behavior : 'smooth'})
    })



// Time Pray 

let pray_time = document.querySelector('.salah-time .time')
let salah_Name = document.querySelector('salah_Name')
    salah_card = document.querySelector('.OneSalah')
    pLocation = document.querySelector('.pLocation')
    pTime = document.querySelector('.pTime')
    Sala_container = document.querySelector('.salah-time .container')
    Ok = document.querySelector('.OK')


inputChange()
function inputChange(){
fetch(`https://api.pray.zone/v2/times/today.json?city=${city?city:'mecca'}`)
    .then(Response => Response.json())
    .then(data =>{
        console.log(data.results);
        console.log(data.results.datetime[0].times);
        Sala_container.innerHTML = ''
        pLocation.innerHTML = `${data.results.location.city} - ${data.results.location.country_code}`;
        pTime.innerHTML = `<p>${data.results.datetime[0].date.hijri}</p>   <p>${data.results.datetime[0].date.gregorian} </p> `
        for (let j = 0; j < data.results.datetime[0].times.length; j++) {
            salah_card.innerHTML = `<p class="time"> ${data.results.datetime[0].times[0]}</p>
            <p class="salah_Name">Sunset</p>`
        }
        let hand = (data.results.datetime[0].times)
        for (let S in hand) {
            console.log("Page: " + S + hand[S] );
            Sala_container.innerHTML += `<div class="OneSalah">
            <p class="time" >${S}</p>
            <p class="salah_Name">${hand[S]}</p>
        </div> `
        }
    })
}

var city ;
Ok.addEventListener('click',()=>{
    let Input_value = document.querySelector('.salah-time input').value;
    if (Input_value != ''){
    city = Input_value ;
    inputChange()
    }else{
        alert('ادخل مدينتك')
    }
})

let salahHeader = document.querySelector('[data-filter="salah"]')
    salahSection = document.querySelector('.salah-time')
    salahHeader.addEventListener('click', ()=>{
        salahSection.scrollIntoView({behavior : 'smooth'})
    })



    // scroll up 
let Scroll_Up = document.querySelector('.scroll-top');

document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;
    window.scrollY > 700 ? Scroll_Up.style.display='' : Scroll_Up.style.display='none'
});

    salahSection = document.querySelector('.salah-time')
Scroll_Up.addEventListener('click', ()=>{
    landing = document.querySelector('.landing')
    landing.scrollIntoView({behavior : 'smooth'})
})


// side BAR 
let bars = document.querySelector('.bars');
    sideBar = document.querySelector('.header ul')
    bars.addEventListener('click', ()=>{
        sideBar.classList.toggle('active') // toggle make the oposite of his 
    })