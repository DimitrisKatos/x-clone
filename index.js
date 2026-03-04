import { tweetsData } from './data.js'
/* CDN: Content Delivery Network*/
 
const tweetInput = document.getElementById('chat-input')
const tweetBtn = document.getElementById('tweet-btn')


tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
    tweetInput.value = ''
})

function getFeedHtml(){
    
    let feedHtml = ``
    // for(let tweet of tweetsData){
    //     feedHtml += `
    //             <div class="tweet">
    //         <div class="tweet-inner">
    //             <img src="${tweet.profilePic}" class="profile-pic">
    //             <div>
    //                 <p class="handle">${tweet.handle}</p>
    //                 <p class="tweet-text">${tweet.tweetText}</p>
    //                 <div class="tweet-details">
    //                     <span class="tweet-detail">
    //                         ${tweet.replies.length}
    //                     </span>
    //                     <span class="tweet-detail">
    //                         ${tweet.likes}
    //                     </span>
    //                     <span class="tweet-detail">
    //                         ${tweet.retweets}
    //                     </span>
    //                 </div>   
    //             </div>            
    //         </div>
    //     </div>`

        
    // }
    tweetsData.forEach(function(tweet){
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <i class="fa-solid fa-comment" data-reply="${tweet.uuid}"></i>
                            <span class="tweet-detail">
                                ${tweet.replies.length}
                            </span>
                            <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                            <span class="tweet-detail">
                                ${tweet.likes}
                            </span>
                            <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                            <span class="tweet-detail">
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>`
    })

    return feedHtml 
}


function render(){
    const feed = document.getElementById('feed')

    feed.innerHTML = getFeedHtml()
}

render()
document.addEventListener('click', function(e) {
    if(e.target.dataset.reply){
        console.log("A reply added "+e.target.dataset.reply)
        handleLikeClick(e.target.dataset.reply)
    }
    if(e.target.dataset.like){
        console.log("A comment added "+e.target.dataset.like)
    }
    if(e.target.dataset.retweet){
        console.log("A retwett made "+e.target.dataset.retweet)
    }
})

function handleLikeClick(tweetId){
    console.log(tweetId)
}