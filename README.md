# riot-i18n

[![Build Status](https://travis-ci.org/any-code/riot-i18n.svg?branch=master)](https://travis-ci.org/any-code/riot-i18n)

> Riot JS internationalization tag and mixin

## Getting Started

### 1. Installation

``` bash
npm install riot-i18n
```

### 2. Examples

include with module loader
``` javascript
    var i18n = require('riot-i18n');  
      
    i18n.dictionary({
        "zh": {
            "Hello": "您好",
            "I love you": "我爱你"
        },
        "jp": {
            "Hello": "こんにちは",
            "I love you": "わたしは、あなたを愛しています"
        }
    })  
```

or via script tag
``` html
    <script src="/path/to/riot-i18n/riot-i18n.min.js"></script><!-- exposes global var 'i18n' --> 
    
```

The library register's the 'i1-8n' tag with riot.
``` html
    <section>
        <i1-8n>Hello</i1-8n><br>
        <i1-8n>I love you</i1-8n>
    </section>
```        

and provides a 'localise' method for translating outside of a tag
``` javascript
   i18n.setLanguage('zh')
   i18n.localise('Hello') // -> 您好
```

setting language can be achieved using i18n.setLanguage('lang') or triggered using a riot observable
``` html
<riot-tag>
    <ul>
        <li><a onclick="{ onClick }">en</a></li>
        <li><a onclick="{ onClick }">zh</a></li>
        <li><a onclick="{ onClick }">jp</a></li>
    </ul>    
        
   riot.mixin('i18n')
   
   this.i18n.setLanguage('fr')
   this.i18n.localise('Hello') // -> Hello
   
   this.onClick = function(e) {
        this.i18n.trigger('lang',  e.target.innerHTML)
   }
   
   this.i18n.trigger('lang',  'jp')
   this.i18n.localise('Hello') // -> こんにちは
</riot-tag>   
```

If no dictionary language substitute is available the default will always be used 

localise method substitution object
```javascript

    this.i18n.localise("Hello {user.name}!", {
        user: {
            name: "Goodman"
        }
    }) // --> Hello Goodman!

```

nested properties
```javascript
    i18n.dictionary({
        "en": {
            "user": {
                "name": "User Name"
            }
    }) 

    this.i18n.localise("user.name") // --> User Name
```



## Copyright and license
Copyright (c) 2015-2016 [Anycode](https://anycode.io/ "Anycode") <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
