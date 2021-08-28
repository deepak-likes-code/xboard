let url = [
    "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
    "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
    "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
]


init('corona', 0);
init('tech', 1);
init('sports', 2);


async function getData(url) {

    try {
        let res = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${url}`
        );

        if (!res.ok) throw Error(res.statusText);
        let data = await res.json()

        return data.items
    } catch (err) {
        return err;
    }
}




async function init(name, index) {



    let arrayItems = await getData(url[index]);
    console.log(arrayItems)
    let id = document.getElementById(name);
    let dom = id.querySelector('.carousel-inner')
    console.log(dom);

    arrayItems.forEach((element, index) => {
        let div = document.createElement('div');
        div.id = 'carousel-item'

        if (index = 0) {
            div.className = 'carousel-item active'

        } else {
            div.className = 'carousel-item '

        }

        div.innerHTML = `<img src="${element.enclosure.link}" class="rounded mx-auto d-block my-6"></img>
        <h1 class="text-center my-3">${element.title}</h1>
        <div class='author d-flex my-2 '>
        <p class="mr-4">${element.author}</p>
        <p>${element.pubDate}</p>
        </div>
        <p>${element.description}</p>
        `


        dom.appendChild(div)
    });
    let ele = document.getElementsByClassName('carousel-item');
    ele[0].classList.add('active');



    let carouselItems = document.querySelectorAll('#carousel-item');

    carouselItems.forEach(item => {
        item.addEventListener('click', (e) => {
            $("#" + name).carousel("next");

        })
    }


    )
}
// Change slides on click
