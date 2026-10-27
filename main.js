const $btnKick = document.getElementById('btn-kick');
const $logs = document.querySelector('#logs');

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    const { elHP, damageHP, defaultHP } = this;
    elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressbarHP() {
    const { elProgressbar, damageHP } = this;
    elProgressbar.style.width = `${damageHP}%`;

    if (damageHP < 20) {
        elProgressbar.classList.add('critical');
        elProgressbar.classList.remove('low');
    } else if (damageHP < 60) {
        elProgressbar.classList.add('low');
        elProgressbar.classList.remove('critical');
    } else {
        elProgressbar.classList.remove('low', 'critical');
    }
}

function changeHP(count) {
    this.damageHP -= count;

    const { name, damageHP } = this;

    if (damageHP <= 0) {
        this.damageHP = 0;
        alert(`${name} програв бій!`);
        $btnKick.disabled = true;
    }

    this.renderHP();

    const log = this === enemy
        ? generateLog(this, character, count)
        : generateLog(this, enemy, count);

    const $p = document.createElement('p');
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP,
    changeHP,
    renderHPLife,
    renderProgressbarHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP,
    changeHP,
    renderHPLife,
    renderProgressbarHP,
};

const random = (num) => Math.ceil(Math.random() * num);

const generateLog = (firstPerson, secondPerson, count) => {
    const { name: firstName, damageHP, defaultHP } = firstPerson;
    const { name: secondName } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага.`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар.`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком <вырезано цензурой> противника.`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар.`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар.`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника.`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника.`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику.`
    ];

    return `${logs[random(logs.length) - 1]} -${count}, [${damageHP}/${defaultHP}]`;
};

const countBtn = (count = 6, el) => {
    let clicks = 0;

    return () => {
        clicks++;
        const remaining = count - clicks;
        console.log(`Кнопку натиснуто: ${clicks} раз(ів). Залишилось натискань: ${remaining}`);

        if (remaining <= 0) {
            el.disabled = true;
            console.log(`Ліміт (${count} натискань) вичерпано!`);
        }
    };
};

const btnKickCounter = countBtn(6, $btnKick);

const init = () => {
    character.renderHP();
    enemy.renderHP();
};

$btnKick.addEventListener('click', () => {
    btnKickCounter();
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

init();