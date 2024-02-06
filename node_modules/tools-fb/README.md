# Download Video Or Find User ID FaceBook

## Install:
```bash
npm install tools-fb
```

# Note:
> * If My Code Is Not Okay, Please Forgive Me, Because I'm Just A Kid <3
> * I Will Try To Bring The Best Experience For You
> * Fix Bad Token And Token Expired By [NTKhang](https://www.facebook.com/ntkhang03)

## Usages:
* ### getUserID:
```js
const tools = require("tools-fb");
tools.getUserID("Url FaceBook")
  .then(result => {
    console.log(result);
  })

/*[ - Or - ]*/

const tools = require("tools-fb");
const result = await tools.getUserID("Url FaceBook");
console.log(result);

/* [ - Example - ] */
/*
{ 
  status: 200,
  data: 'ID User' 
}
*/
```

* ### getVideoUrl:
```js
const tools = require("tools-fb");
tools.getVideoUrl("Url FaceBook Watch")
  .then(result => {
    console.log(result);
  })

/*[ - Or - ]*/

const tools = require("tools-fb");
const result = await tools.getVideoUrl("Url FaceBook Watch");
console.log(result);

/* [ - Example - ] */
/*
{     
  status: true
  time: 'time video',
  thumb: 'link thumbail',
  audio: 'link audio',
  HD: 'link HD',
  SD: 'link SD'
}
*/
```

# Contact Me:
> * FaceBook: [ThinhJVox](https://www.facebook.com/thinhvooo)
 
> * Zalo: 0856141107 (Thinhvoo)

> * Discord: [Heaven](https://discord.gg/7UrdX8xrez)

# Thank You For Using My API
![](https://www.english-learning.net/wp-content/uploads/2018/03/Thank-you.jpg)