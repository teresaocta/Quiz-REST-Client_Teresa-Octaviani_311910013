const baseUrl = "https://api.genshin.dev/";
const characters = `${baseUrl}characters`;
const weapons = `${baseUrl}weapons`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getCharacters()
{
    title.innerHTML = "GENSHIN GUIDE"

    fetch(characters)
        .then(response => response.json())
        .then(resJson =>
            {
                let chara = "";
                let c = "";
                let color = "";

                resJson.forEach(charas => {
                    c = characters + "/" + charas;

                    fetch (c)
                        .then(response => response.json())
                        .then(respJson => 
                            {
                                if(respJson.vision == "Geo")
                                {
                                    color = "yellow lighten-1";
                                };

                                if(respJson.vision == "Pyro")
                                {
                                    color = "deep-orange accent-1";
                                };

                                if(respJson.vision == "Cryo")
                                {
                                    color = "light-blue lighten-5";
                                };

                                if(respJson.vision == "Hydro")
                                {
                                    color = "light-blue accent-1";
                                };
                                
                                if(respJson.vision == "Anemo")
                                {
                                    color = "teal accent-1";
                                };

                                if(respJson.vision == "Electro")
                                {
                                    color = "purple lighten-4";
                                };

                                chara += `
                                <div class="col s12 m6">
                                    <div class="card ${color}">
                                        <div class="card-content black-text">
                                            <span class="card-title"><h5><b>${respJson.name}</b></h5></span>
                                            <table>
                                                <tr>
                                                    <td>Vision</td>
                                                    <td>:</td>
                                                    <td>${respJson.vision}</td>
                                                </tr>
                                                <tr>
                                                    <td>Weapon</td>
                                                    <td>:</td>
                                                    <td>${respJson.weapon}</td>
                                                </tr>
                                                <tr>
                                                    <td>Nation</td>
                                                    <td>:</td>
                                                    <td>${respJson.nation}</td>
                                                </tr>
                                                <tr>
                                                    <td>Rarity</td>
                                                    <td>:</td>
                                                    <td>${respJson.rarity}</td>
                                                </tr>
                                            </table>
                                            <div class="card-action">
                                                <a href="#" data-id="${charas}" class="secondary-content black-text">Detail</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;

                                contents.innerHTML = `
                                <div class="col s12">
                                    <h4><b>Genshin Characters</b></h4>
                                    <div class="row">
                                        ${chara}
                                    </div>
                                </div>
                                `;

                                const detail = document.querySelectorAll('.secondary-content');
                                detail.forEach(btn=>{
                                    btn.onclick = (event)=>{
                                        getDetails(event.target.dataset.id);
                                    }
                                })
                            }).catch(err =>
                                {
                                    console.error(err);
                                })
                });
            })
}

function getDetails(dname)
{
    let url = characters + "/" + dname;
    let color = "";
    let skillTalent = "";
    let passiveTalent = "";

    fetch (url)
        .then(response => response.json())
        .then(respJson => 
            {
                title.innerHTML = respJson.name;
                
                if(respJson.vision == "Geo")
                {
                    color = "yellow lighten-1";
                };

                if(respJson.vision == "Geo")
                {
                    color = "yellow lighten-1";
                };

                if(respJson.vision == "Pyro")
                {
                    color = "deep-orange accent-1";
                };

                if(respJson.vision == "Cryo")
                {
                    color = "light-blue lighten-5";
                };

                if(respJson.vision == "Hydro")
                {
                    color = "light-blue accent-1";
                };
                                
                if(respJson.vision == "Anemo")
                {
                    color = "teal accent-1";
                };

                if(respJson.vision == "Electro")
                {
                    color = "purple lighten-4";
                };

                respJson.skillTalents.forEach(skill => {
                    skillTalent += `
                    <tr>
                        <td>${skill.name}</td>
                        <td>${skill.unlock}</td>
                        <td>${skill.description}</td>
                    </tr>
                    `;
                });

                respJson.passiveTalents.forEach(passive => {
                    passiveTalent += `
                    <tr>
                        <td>${passive.name}</td>
                        <td>${passive.unlock}</td>
                        <td>${passive.description}</td>
                    </tr>
                    `;
                });

                contents.innerHTML = `
                <div class="col s12">
                    <h4><b>${respJson.name}</b></h4>
                    <div class="row ${color}">
                        <table>
                            <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>${respJson.name}</td>
                            </tr>
                            <tr>
                                <td>Vision</td>
                                <td>:</td>
                                <td>${respJson.vision}</td>
                            </tr>
                            <tr>
                                <td>Weapon</td>
                                <td>:</td>
                                <td>${respJson.weapon}</td>
                            </tr>
                            <tr>
                                <td>Nation</td>
                                <td>:</td>
                                <td>${respJson.nation}</td>
                            </tr>
                            <tr>
                                <td>Affiliation</td>
                                <td>:</td>
                                <td>${respJson.affiliation}</td>
                            </tr>
                            <tr>
                                <td>Rarity</td>
                                <td>:</td>
                                <td>${respJson.rarity}</td>
                            </tr>
                            <tr>
                                <td>Constellation</td>
                                <td>:</td>
                                <td>${respJson.constellation}</td>
                            </tr>
                            <tr>
                                <td>Birthday</td>
                                <td>:</td>
                                <td>${respJson.birthday}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>${respJson.description}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="col s12">
                        <h4>Skill Talents</h4>
                        <table class="centered striped">
                            <thead>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Description</th>
                            </thead>
                            <tbody>
                                ${skillTalent}
                            </tbody>
                        </table>
                    </div>
                    <div class="col s12">
                        <h4>Passive Talents</h4>
                        <table class="centered striped">
                            <thead>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Description</th>
                            </thead>
                            <tbody>
                                ${passiveTalent}
                            </tbody>
                        </table>
                    </div>
                </div>
                `;
            })
}

function getWeapons()
{
    title.innerHTML = "GENSHIN GUIDE"

    fetch(weapons)
        .then(response => response.json())
        .then(resJson =>
            {
                let weapon = "";
                let wp = "";
                let color = "";
                let w = "";

                resJson.forEach(weapon => {
                    w = weapons + "/" + weapon;

                    fetch (w)
                        .then(response => response.json())
                        .then(respJson => 
                            {                                                     
                                if(respJson.rarity == 3)
                                {
                                    color = "light-blue accent-1";
                                };

                                if(respJson.rarity == 4)
                                {
                                    color = "purple lighten-3";
                                };

                                if(respJson.rarity == 5)
                                {
                                    color = "amber lighten-2";
                                };

                                wp += `
                                <tr class="${color}">
                                    <td>${respJson.name}</td>
                                    <td>${respJson.type}</td>
                                    <td>${respJson.rarity}</td>
                                    <td>${respJson.baseAttack}</td>
                                    <td>${respJson.subStat}</td>
                                    <td>${respJson.passiveDesc}</td>
                                </tr>
                                `;

                                contents.innerHTML = `
                                <h4><b>Genshin Weapons</b></h4>
                                <table class="centered">
                                    <thead>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Rarity</th>
                                        <th>Base Attack</th>
                                        <th>Sub Stat</th>
                                        <th>Passive</th>
                                    </thead>
                                    <tbody>
                                        ${wp}
                                    </tbody>
                                </table>
                                `;
                            }).catch(err =>
                                {
                                    console.error(err);
                                })
                });
            })
}

function loadPage(page)
{
    switch(page)
    {
        case "characters":
            getCharacters();
            break;
        case "weapons":
            getWeapons();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "characters";
    loadPage(page);
});