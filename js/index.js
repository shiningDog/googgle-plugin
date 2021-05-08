window.onload = function () {
  initUrlBox()
  drawing()
}

var defaultCardData = [{
  name: 'Dribbble',
  remark: '国际知名设计站点！资深设计师必备网站',
  site: 'www.baidu.com'
}]

function initUrlBox() {
  var urlItemEl = document.querySelector('.url-box')
  var str = ''
  var lcalUrlBox = localStorage.getItem('locaUrlBox')
  var urlBox = lcalUrlBox ? defaultCardData.concat(JSON.parse(lcalUrlBox)) : defaultCardData
  var length = urlBox.length
  for (var i = 0; i < length; i++) {
    str += '<div class="url-itme">' +
      '<a href="' + urlBox[i].site + '" target="_blank">' +
      '  <div class="layout-item">' +
      '    <div class="item-l">' +
      '      <img src="./images/brand-1.png" alt="">' +
      '    </div>' +
      '    <div class="item-r">' +
      '      <div class="name">' + urlBox[i].name + '</div>' +
      '      <p class="describe">' + urlBox[i].remark + '</p>' +
      '    </div>' +
      '  </div>' +
      '</a>' +
      '</div>'
  }
  str += ' <div class="url-itme">' +
    '   <div class="layout-item add-more">' +
    '     <img src="./images/add.svg" alt=""><span class="add-text">添加快捷方式</span>' +
    '   </div>' +
    ' </div>'

  urlItemEl.innerHTML = str


  var addMoreEl = document.querySelector(".add-more")
addMoreEl.addEventListener('click',function(){
  nameIptEl.value = ""
  siteIptEl.value = ""
  remarkIptEl.value = ""
  document.querySelector('.dialog').style.display = 'block'
})
}

var navBox = document.querySelectorAll(".nav-box .nav-item")
navBox.forEach(function (item, index) {
  item.addEventListener('click',function(e){
    navClick(e)
  })
})
function navClick(e) {
  var oldOffsetLeft=e.nodeName == 'DIV'?0:document.querySelector(".nav-item.active").offsetLeft;
  console.log(oldOffsetLeft)
  navBox.forEach(function (item, index) {
    item.classList.remove('active')
  })
  if (e.nodeName == 'DIV') {
    e.classList.add('active')
  } else {
    e.target.classList.add('active')
  }
  var el = document.querySelector(".arrows")
  var activeItem = document.querySelector(".nav-item.active")
  var left = activeItem.offsetLeft
  console.log(left>oldOffsetLeft?'右':'左')
  el.style.left = left + activeItem.clientWidth / 2 + 'px'
  el.querySelector("img").style.transform =left>oldOffsetLeft?'rotate(0deg)':'rotate(180deg)'
}
navClick(document.querySelector(".nav-item.active"))


var nameIptEl = document.querySelector(".dialog input[name='name']")
var siteIptEl = document.querySelector(".dialog input[name='site']")
var remarkIptEl = document.querySelector(".dialog input[name='remark']")




function close() {
  document.querySelector('.dialog').style.display = 'none'
}
document.querySelectorAll('.close').forEach(function (item) {
  item.addEventListener('click', function () {
    close()
  })
})

document.querySelector('.commit').addEventListener('click', function () {
  var name = nameIptEl.value.trim()
  var site = siteIptEl.value.trim()
  var remark = remarkIptEl.value.trim()
  // if(name.trim())
  if (!name.length) {
    alert('名称不能为空')
    return
  }
  if (!site.length) {
    alert('地址不能为空')
    return
  }
  var locaUrlBox = localStorage.getItem('locaUrlBox')
  var item = {
    name: name,
    remark: remark,
    site: site
  }
  if (locaUrlBox && JSON.parse(locaUrlBox) instanceof Array) {
    var box = JSON.parse(locaUrlBox)
    box.push(item)
    localStorage.setItem('locaUrlBox', JSON.stringify(box))
  } else {
    localStorage.setItem('locaUrlBox', JSON.stringify([item]))
  }
  close()
  initUrlBox()
})

function drawing(){
  var drawingBox = document.querySelector('.drawing')
  if(!drawingBox)return
  var unit = 'px'
  var width = 640
  var height = 667
  var bgImgWidth = 38400
  var bgImgUrl = './images/Vslab.png'
  var frameNum = (bgImgWidth / width)-1
  var index = 0
  drawingBox.style.width = width + unit
  drawingBox.style.height = height + unit
  drawingBox.style.backgroundImage = 'url('+bgImgUrl+')'
  drawingBox.style.backgroundRepeat = 'no-repeat'
  drawingBox.style.backgroundSize = bgImgWidth+unit+' '+height+unit
  drawingBox.style.backgroundPosition = '0 center'
  
  var drawingTime = setInterval(function(){
    if(index === frameNum){
      clearInterval(drawingTime)
      return
    }
    index++
    var psLeft = width * index
    drawingBox.style.backgroundPosition = '-'+psLeft+unit+' center'
  },40) 

}