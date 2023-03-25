
var p = require('puppeteer');

async function func(){
  let browser = await p.launch();
  let page = await browser.newPage();
  await page.goto('https://www.github.com/trending');

  let all_repos = await page.$$('.Box-row');

  for (let repo of all_repos) {
    let title = await repo.$eval('h1 a', function(node){ 
        return node.innerText.trim()
    });
     let description = await repo.$eval('p', function(node){ 
        return node.innerText.trim()
    });
    let url = await repo.$eval('h1 a', function(node){
         return node.href
        });
    let star = await repo.$eval('a[href$="stargazers"]', function(node){ 
        return node.innerText.trim()
    });

  console.log({title, 
    description, 
    url, 
    star});
}

await browser.close();
}

func();


