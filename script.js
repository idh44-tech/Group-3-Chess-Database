var playing = false;

var current = false;

var startTime = 300;

var panel = document.querySelectorAll(".player");

var Counter = function(display, time)
{
    this.time = time;
    this.display = display;
    display.textContent = convertSeconds(this.time);

    this.passTime = function()
    {
        if (this.time > 0)
        {
            this.time--;
            display.textContent = convertSeconds(this.time);
        }
    }
}

var counters = [
    new Counter(document.querySelector("#counter1"), startTime),
    new Counter(document.querySelector("#counter2"), startTime)
]

function changeTurns()
{
    panel[+current].classList.toggle("active");
    current = !current;
    panel[+current].classList.toggle("active");
}

for (var i = 0; i < panel.length; i++)
{
    panel[i].addEventListener("click", changeTurns);
}

function convertSeconds(s)
{
    var min = Math.floor(s / 60);
    var sec = s % 60;
    var extra = "";
    if (sec < 10)
    {
        extra = "0";
    }
    return min + ":" + extra + sec;
}

function pause()
{
    playing = !playing;
}

document.querySelector("#pause").addEventListener("click", pause);



function restart()
{
    for (var i = 0; i < counters.length; i++)
    {
        counters[i].time = startTime;
        counters[i].display.textContent = convertSeconds(startTime);
    }

    if (playing)
    {
        pause();
    }
}

document.querySelector("#restart").addEventListener("click", reset);

function init()
{
    if (playing)
    {
        counters[+current].passTime();
    }
}

setInterval(init, 1000);