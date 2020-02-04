const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Gin = require('../models/gin')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => { // 1st - we connect to the database
  if (err) return console.log(err)
  db.dropDatabase() // * 2nd - when connected, we drop it, this flushes out any previous data
    .then(() => {
      return User.create([
        {
          username: 'ckapak',
          email: 'ckapak@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        },
        {
          username: 'mmelton',
          email: 'matt@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(createdUsers => {
      console.log(`${'👩‍🚒'.repeat(createdUsers.length)} users created`)
      return Gin.create([
        {
          name: 'Fishers Gin',
          origin: 'Suffolk, UK',
          image: 'https://fishersgin.com/site/templates/images/bottle-2019.png',
          description: 'This unusual gin features a host of rare botanicals foraged on the Suffolk coast. Herbaceous and subtly saline on the nose (we were reminded of sea vegetables), it’s slightly sweeter to taste, with aromatic cardamom notes.',
          user: createdUsers[0]
        }, {
          name: 'Porters Gin',
          origin: 'Aberdeen, UK',
          image: 'https://img.thewhiskyexchange.com/900/gin_por3.jpg',
          description: 'Made in Aberdeen, this is a classic gin with bold juniper and bright citrus notes. It’s created using a combination of old and new techniques. Light flavours are extracted from delicate botanicals through cold distillation so as not to damage them with heat, while other more robust ingredients are distilled at one of the UK’s oldest gin distilleries, allowing the unique characteristics of each to shine through.',
          user: createdUsers[0]
        }, {
          name: 'Slingsberry Gooseberry Gin',
          origin: 'Yorkshire, UK',
          image: 'https://cdn11.bigcommerce.com/s-720fd/images/stencil/2048x2048/products/4688/8201/Slingsby-Rubarb-Gin__96507.1493375394.jpg?c=2',
          description: 'Slingsby’s rhubarb gin was a hit at olive HQ and now the Yorkshire distillery has released another tart and zesty winner. Here, tangily fruity gooseberries (also sourced in Yorkshire) marry perfectly with the citrussy notes of the base gin.',
          user: createdUsers[0]
        }, {
          name: 'Cambridge Distillery Japanese Gin',
          origin: 'Cambridge, UK',
          image: 'https://chestnuthouseonline.co.uk/image/cache/catalog/gins/gin_jap1%20(Copy)-1000x1000.jpg',         
          description: 'One of the first gins to focus exclusively on Japanese botanicals (with each distilled individually and then blended together, as per the brand’s distinctive distillation process), this is an elegant, complex yet balanced gin, with cool, vegetal cucumber notes, citrus from yuzu, earthy spice and subtle pepperiness. Combine with a beautiful bottle and this would be a great gift for a gin connoisseur looking for something more unusual to try.',
          user: createdUsers[0]
        }, {
          name: 'Biggar Gin',
          origin: 'Scotland',
          image: 'https://selectdrams.co.uk/wp-content/uploads/2019/04/Biggar-Gin-20cl-001-300x450.jpg',
          description: 'This award-winning gin, made in batches of just 200 bottles at a time, uses botanicals local to the Scottish town of Biggar, where it’s made. As to be expected from a London dry gin it’s got plenty of juniper character, as well as vibrant orange notes, subtle herbaceousness and spice, and a restrained sweetness. It’s also super smooth to drink, with a lingering finish.',
          user: createdUsers[0]
        }, {
          name: 'Darley\'s Spiced Gin',
          origin: 'Scotland',
          image: 'https://cdn.shopify.com/s/files/1/2137/3635/products/C1C0A946-1784-436C-8869-7D66847CE725_2048x.jpeg?v=1557395528',
          description: 'One for those who can find some spiced gins a little overpowering, this Scottish number has a subtle, restrained spice that’s balanced by juniper, with a lingering, peppery finish.',
          user: createdUsers[0]
        }, {
          name: 'Ramsbury Gin',
          origin: 'Wiltshire, UK',
          image: 'https://www.31dover.com/media/image/01/e9/53/product_31d3286_ramsburyvodka.jpg',
          description: 'This single-estate gin is made in Wiltshire by a distillery whose ethos is very much grain to glass – the gin’s base spirit is distilled onsite using wheat grown on the Ramsbury estate (and chalk-filtered water from their own aquifer). A lovely, balanced London dry gin with heady citrus and floral aromas on the nose and a smooth, fruity finish.',
          user: createdUsers[0]
        }, {
          name: 'Tarquin\'s Gin',
          origin: 'Wiltshire, UK',
          image: 'https://img.thewhiskyexchange.com/900/gin_tar1.jpg',
          description: 'With English wine growing in stature internationally, and Craft distilling moving from urban hubs and out into the countryside, Tarquin’s Gin isn’t just representative of a burgeoning movement; it’s one of the leading lights within it. To taste, Tarquin’s Dry Gin is a well-balanced gin with all the classic botanicals coming through on both the nose and the palate.',
          user: createdUsers[0]
        }
      ])
    })

    .then(createdGin => console.log(`${createdGin.length} gins created and sitting on the wall`))
    // * if all went well in creating the gins, we should see a message displaying how many were created
    .catch(err => console.log(err))
    // * if there is an issue, we will log the error, could be something like one of the failed the valdiations from the model?
    .finally(() => mongoose.connection.close())
    // * and finally, when all the above is done, close the connection
})






