import { tweetsData } from './data.js'
/* CDN: Content Delivery Network*/
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

 
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
        let feedReplyHtml = ``
        if(tweet.replies.length > 0){
            console.log(`The ${tweet.uuid} has a reply`)

            
            for(let reply of tweet.replies){
                feedReplyHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                    </div>`
            }
        }


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
                            <i class="fa-solid fa-heart ${tweet.isLiked ? 'liked' : ''}" data-like="${tweet.uuid}"></i>
                            <span class="tweet-detail">
                                ${tweet.likes}
                            </span>
                            <i class="fa-solid fa-retweet ${tweet.isRetweeted ? 'retweeted' : ''}" 
                                data-retweet="${tweet.uuid}">
                            </i>
                            <span class="tweet-detail">
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${feedReplyHtml}
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
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.dataset.like){
        // console.log("A like added "+e.target.dataset.like)
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet){
        console.log("A retwett made "+e.target.dataset.retweet)
        handleRetweetClick(e.target.dataset.retweet)
    }else if(e.target.id === "tweet-btn"){
        handleTweetBtnClick()
    }

})

function handleTweetBtnClick(){
    const tweetInput = document.getElementById("chat-input")
    
    tweetsData.push({
        handle: `@JimDonw`,
        profilePic: `images/musk.png`,
        tweetText:`${tweetBtn.value}`,
        uuid: uuidv4()
    })
    console.log("xyseme 2: " + JSON.stringify(tweetsData))
    render()
}

function handleLikeClick(tweetId){

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }

    targetTweetObj.isLiked = !targetTweetObj.isLiked

    render()
}


function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    render()
}


function handleReplyClick(tweetId){
    console.log(tweetId)

    const replies = document.getElementById(`replies-${tweetId}`)
    replies.classList.toggle('hidden')

}