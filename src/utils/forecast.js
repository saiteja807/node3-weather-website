const request=require('request')
const forecast=(latitude,longitude,callback) => {
    const url='https://api.darksky.net/forecast/01c8253b764aea3b11e2fc20cae11479/'+latitude+','+longitude
    request({url,json:true},(error,{body}) =>
    {
        if(error) {
            callback('Unable to coonect weather service! ',undefined)
        }
        else if(body.error){
            callback('Unable to find location ',undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' +body.currently.temperature+ ' degrees out. there is a ' +body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports=forecast