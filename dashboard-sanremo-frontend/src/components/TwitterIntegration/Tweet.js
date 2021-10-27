import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TwitterIcon from '@material-ui/icons/Twitter';


/** 
 * Styling theme of the twitter feed
 * @const: useStyles 
 * 
 * */

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 12,
        border: "1px solid rgba(0, 0, 0, 0.15)",
        maxWidth: 300,
        paddingTop: 11,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 4,
        backgroundColor: "white",
        height: "fit-content",
        "&:hover": {
            background: "rgba(247, 249, 250)"
        },
        cursor: "pointer"
    },
    flexRow: {
        display: "flex"
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
    },
    header: {
        gap: 4,
        marginBottom: 11
    },
    spacer: {
        flexGrow: 4
    },
    userImage: {
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center"
    },
    user: {
        justifyContent: "center",
    },
    displayName: {
        fontWeight: "bold",
        maxWidth: 150,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
        
    },
    username: {
        color: "rgb(91, 112, 131)",
        maxWidth: 200,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    twitterIcon: {
        color: "rgb(29, 161, 242)"
    },
    main: {
        marginBottom: 4
    },
    text: {
        lineHeight: "19px",
        fontSize: "15px",
        textAlign: "left",
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    },
    textSpecial: {
        color: "rgb(91, 112, 131)",
        fontWeight: 500
    },
    actions: {
        paddingTop: 10,
        marginTop: 5,
        borderTop: "1px solid rgba(0, 0, 0, 0.15)",
        justifyContent: "space-around",
        alignItems: "center"
    },
    actionWrapper: {
        gap: 10
    }
}));

/** 
 * The tweet class: it provides the skeleton
 * of the twitter feed, including the posts,
 * likes, share and media embeding for each tweet.
 * @class: Tweet
*/
export default function Tweet(props) {
    // content
    // date
    // likeCount
    // replyCount
    // retweetCount
    // user {displayname, username,  profileImageUrl}
    const timestamp = new Date(props.data.date);
    const classes = useStyles();

    function like() {
        return(
            <svg style={{width: "24px", height: "24px"}} fill="rgb(91, 112, 131)" viewBox="0 0 24 24">
                <g>
                    <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
                    </path>
                </g>
            </svg>
        );
    }

    function reply() {
        return(
            <svg style={{width: "24px", height: "24px"}} fill="rgb(91, 112, 131)" viewBox="0 0 24 24" >
                <g>
                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z">
                    </path>
                </g>
            </svg>
        );
    }

    function retweet() {
        return(
            <svg style={{width: "24px", height: "24px"}} fill="rgb(91, 112, 131)" viewBox="0 0 24 24">
                <g>
                    <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                    </path>
                </g>
            </svg>
        );
    }

    function handleClick() {
        window.location.href = props.data.url;
    }
    return(
        <div className={clsx(classes.root, classes.flexColumn)} onClick={handleClick}>
            <div className={clsx(classes.header, classes.flexRow)}>
                    
                <img 
                className={classes.userImage} 
                src={props.data.user.profileImageUrl}
                alt="profile" />
               
                <div className={clsx(classes.flexColumn, classes.user)}>
                    <div className={classes.displayName}> {props.data.user.displayname} </div>
                    <div className={classes.username}> @{props.data.user.username} </div>
                </div>
                <div className={classes.spacer} />
                <TwitterIcon className={classes.twitterIcon}/>
            </div>
            <div className={clsx(classes.main, classes.text)}>
                {props.data.content}
            </div>
            <div className={clsx(classes.textSpecial, classes.text)}>
                {timestamp.getHours()}:{timestamp.getMinutes()} · {timestamp.getDate()}/{timestamp.getMonth()}/{timestamp.getFullYear()}
            </div>
            <div className={clsx(classes.actions, classes.flexRow)}>
                <div className={clsx(classes.flexRow, classes.text, classes.textSpecial, classes.actionWrapper)}>
                    <span>{like()}</span>
                    <span>{props.data.likeCount}</span>
                </div>
                <div className={clsx(classes.flexRow, classes.text, classes.textSpecial, classes.actionWrapper)}>
                    <span>{reply()}</span>
                    <span>{props.data.replyCount}</span>
                </div>
                <div className={clsx(classes.flexRow, classes.text, classes.textSpecial, classes.actionWrapper)}>
                    <span>{retweet()}</span>
                    <span>{props.data.retweetCount}</span>
                </div>
            </div>
        </div>
    );
}
