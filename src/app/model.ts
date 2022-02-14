export class Tweet {
    public tweetId!: any;
    public content!: string;
    public userName!: string;
    public publishingTime!: string;
}

export interface User {
    name: string;
    surname: string;
    password: string;
    email: string;
    username: string;
}

export class TweetDtoOut {
    content!: string;
    author!: number;
}

export class TweetDtoIn {
    id!: number;
    content!: string;
    likes!: number;
    retweets!: number;
    comments!: number;
    username!: string;
    publishingTime!: string;
}

export class UserDtoOut {
    username!: string;
    name!: string;
    surname!: string;
    password!: string;
    email!: string;
}

export class UserDtoIn {
    id!: number;
    username!: string;
    name!: string;
    surname!: string;
    email!: string;
    creationDateTime!: Date;
    numberOfTweets!: number;
    numberOfFollowers!: number;
    numberOfPeopleWatched!: number;
}
