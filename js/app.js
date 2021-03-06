
'use strict' ;

let srcimg = [
  'wine-glass.jpg','water-can.jpg','unicorn.jpg','tauntaun.jpg','sweep.png','shark.jpg','scissors.jpg',
  'pet-sweep.jpg','pen.jpg','dragon.jpg','dog-duck.jpg','cthulhu.jpg','chair.jpg',
  'bubblegum.jpg','breakfast.jpg','boots.jpg','bathroom.jpg','banana.jpg','bag.jpg'
] ;
const section = document.getElementById('pic') ;
const list = document.getElementById('button') ;

let picOne = document.getElementById('picOne') ;
let picTwo = document.getElementById('picTwo') ;
let picThree = document.getElementById('picThree') ;
let counterClick = 25 ;
let count = 0 ;
let prevImg =[] ;

let one = 0 ;
let two = 0 ;
let three = 0 ;

function stand (name , picSrc , show = 0 , vote = 0)
{
  this.name = name ;
  this.pic = picSrc ;
  this.see = show ;
  this.votes = vote ;

  stand.arr.push(this) ;
}

stand.arr = [] ;

data();

function print ()
{
  do {
    one = randNum( 0 , srcimg.length -1 ) ;
    two = randNum( 0 , srcimg.length -1 ) ;
    three = randNum( 0 , srcimg.length -1 ) ;

  } while (one === two || one === three || two === three
    || prevImg.includes(one) || prevImg.includes(two) || prevImg.includes(three)) ;

  prevImg = [one,two,three] ;

  picOne.src = ('./img/' + stand.arr[one].pic) ;
  picTwo.src = ('./img/' + stand.arr[two].pic) ;
  picThree.src = ('./img/' + stand.arr[three].pic) ;

  stand.arr[one].see++ ;
  stand.arr[two].see++ ;
  stand.arr[three].see++ ;

  localStorage.info = JSON.stringify(stand.arr);
}

print () ;

section.addEventListener('click' , secFunc) ;

list.addEventListener('click',evenList) ;

function evenList ()
{
  if (count >= counterClick)
  {
    const list = document.getElementById('list') ;

    let ul = document.createElement('ul');
    list.appendChild(ul) ;
    for ( let i = 0 ; i < stand.arr.length ; i++ )
    {let li = document.createElement('li');
      li.textContent = stand.arr[i].name + ' had ' + stand.arr[i].votes + ' Votes and was seen ' + stand.arr[i].see + ' times .' ;
      ul.appendChild(li) ;
    }}
}
stand.prototype.data = function ()
{
  console.log('test');
};

function secFunc (happend)
{
  if (happend.target.id === 'picOne' || happend.target.id === 'picTwo' || happend.target.id === 'picThree')
  {
    if ( count < counterClick )
    {
      if (happend.target.id === 'picOne')
      {print () ;
        count++ ;
        stand.arr[one].votes++ ;/* */
      }
      if (happend.target.id === 'picTwo')
      {print () ;
        count++ ;
        stand.arr[two].votes++;/* */
      }if (happend.target.id === 'picThree')
      {print () ;
        count++ ;
        stand.arr[three].votes++;/* */
      }
    }
  }
  else if ((happend.target.id === 'pic') && (count < counterClick))
  {print () ;
    count++ ;}

  if (count >= counterClick)
  {
    chartJs() ;
    document.getElementById('pic').removeEventListener('click' , secFunc) ;
  }
}

function randNum (min,max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor((Math.random() * (max - min + 1) + min)*1) ;
}

function chartJs ()
{
  let nameImg = [] ;
  let votesImg = [] ;
  let shownImg = [] ;

  for ( let i = 0 ; i < stand.arr.length ; i++)
  {
    nameImg[i] = stand.arr[i].name ;
    shownImg.push(stand.arr[i].see) ;
    votesImg.push(stand.arr[i].votes) ;
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameImg ,
      datasets: [{
        label: '# Shown',
        data: shownImg ,
        backgroundColor: [
          'rgb(180, 22, 219)',
        ],
        borderColor: [
          'rgb(180, 22, 219)',
        ],
        borderWidth: 1
      }
      ,
      {
        label: '# Votes',
        data: votesImg ,
        backgroundColor: [
          'rgb(187, 202, 46)',
        ],
        borderColor: [
          'rgb(174, 190, 25)',
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function data()
{
  if (localStorage.info)
  {
    let info = JSON.parse(localStorage.info) ;
    for(let i = 0 ; i < info.length ; i++)
    {
      new stand ( srcimg[i].split('.')[0] , srcimg[i] , info[i].see, info[i].votes ) ;
    }
  } else {
    for ( let i = 0 ; i < srcimg.length ; i++){
      new stand ( srcimg[i].split('.')[0] , srcimg[i] ) ;
    }
  }
}

