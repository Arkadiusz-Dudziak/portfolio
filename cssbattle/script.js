var xhr= new XMLHttpRequest();
var mainDiv = document.getElementById('main');

for(let i=2; i<34; i++) {
    addBattleElement(i);
}

function addBattleElement(i) {
    let cssBattleDiv = document.createElement("iframe");
    cssBattleDiv.classList.add('cssBattleDiv');
    cssBattleDiv.id = i;
    cssBattleDiv.src = 'all_battles/' + i + '.html';
    cssBattleDiv.width = 300;
    cssBattleDiv.height = 400;
    cssBattleDiv.scrolling = 'no';
    cssBattleDiv.frameBorder = '0';
    mainDiv.appendChild(cssBattleDiv);
    window.parent.document.getElementById(i).width = '400px';
    window.parent.document.getElementById(i).height = '300px';
    window.parent.document.getElementById(i).style.overflow = 'hidden';
}