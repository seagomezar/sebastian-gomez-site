import React from 'react'
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'next-share';

const HOST = "https://sebastian-gomez.com/post/"

export default function SocialShare({url}) {
    return (
        <div>
            <TwitterShareButton url={HOST + url} >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <FacebookShareButton url={HOST + url} >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <PinterestShareButton url={HOST + url} >
                <PinterestIcon size={32} round />
            </PinterestShareButton>
            <RedditShareButton url={HOST + url} >
                <RedditIcon size={32} round />
            </RedditShareButton>
            <WhatsappShareButton url={HOST + url} >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={HOST + url} >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    )
}