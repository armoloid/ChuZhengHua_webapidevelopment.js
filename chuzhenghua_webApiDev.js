module.exports = {
    players: [
        {username: "player 1", friends: ["player 2", "player 4"], daysPlayed: ["2026-11-10", "2026-11-12", "2026-11-13", "2026-11-14", "2026-11-15"] },
        {username: "player 2", friends: ["player 1"], daysPlayed: ["2026-11-10", "2026-11-12", "2026-11-17"] },
        {username: "player 3", friends: [], daysPlayed: ["2026-11-16", "2026-11-17"] },
        {username: "player 4", friends: ["player 1", "player 5"], daysPlayed: ["2026-11-11", "2026-11-14", "2026-11-15", "2026-11-16", "2026-11-17", "2026-11-18"] },
        {username: "player 5", friends: ["player 4"], daysPlayed: ["2026-11-15"] },
        {username: "player 6", friends: [], daysPlayed: [] }
    ],
    games: [
        {timeControl: "blitz", white: "player 1", black: "player 2", winner: "player 1", date: "2026-11-10" },
        {timeControl: "bullet", white: "player 2", black: "player 1", winner: "player 2", date: "2026-11-12" },
        {timeControl: "rapid", white: "player 4", black: "player 1", winner: "draw", date: "2026-11-14" },
        {timeControl: "blitz", white: "player 5", black: "player 4", winner: "player 4", date: "2026-11-15" },
        {timeControl: "rapid", white: "player 3", black: "player 2", winner: "player 3", date: "2026-11-17" }
    ],
    lessons: [
        {id: 1, title: "How the Pieces Move" },
        {id: 2, title: "Basic Checkmates" },
        {id: 3, title: "Opening Principles" },
        {id: 4, title: "Tactics: Forks and Pins" },
        {id: 5, title: "Pawn Structures" }
    ],

    //this is just to help find a player cuz i needed to find player a few times later on
    //it takes the username andtry to match it in players table
    findPlayer: function(username){
        return this.players.find(p=>p.username == username);
    },

    //findfriend lets u search for ppl by entering thier name, if the name u keyed in dont exist, it will say no player found, 
    // if u didnt put in anything it will say enter username, if you give it a valid name it will show u that person
    findFriend: function(username){
        if (!username){
            return "enter username";
        }
        const player = this.findPlayer(username);
        if (!player){
            return "no player found";
        }
        return player.username
    },

    //add friend adds someone else as a friend. you will need ur user and ur friends name but in the app itself
    //you only need ur friends name as u have to log in to a account to add friends.
    //when u add someone as friend, you will also be added to thier friendlist. 
    //it will only work if ur friend can be found
    addFriend: function(username, friendUsername){
        const player = this.findPlayer(username);
        const friend = this.findPlayer(friendUsername);
        if (!friend){
            return "player cannot be found"
        }
        player.friends.push(friendUsername);
        friend.friends.push(username);
    },

    //game history show game history, it use filter to find games where the player(username) is playing for either black or white, 
    //then check if the user has a history, if no, say no game data else
    //use .map to loop through all the history and create a new array with the details i want and display it in an array
    gameHistory: function(username){
        const history = this.games.filter(g=>g.white == username || g.black == username);
        if (history.length == 0){
            return "no game data";
        }
        return history.map(g=>({
            date: g.date,
            type: g.timeControl,
            opponent: g.white == username ? g.black : g.white,
            winner: g.winner
        }))
    },

    //you can input a lesson name if you want. if you dont, it displays all lessons. if you put a lessoin name, 
    //it must exist otherwise it will tell you no result found.
    //if it exist, it will show tell u what lesson you are starting. 
    Lesson: function(lessonName){
        if (!lessonName){
            return this.lessons;
        }
        const lesson = this.lessons.find(l=>l.title == lessonName);
        if (!lesson){
            return "no result found"
        }
        return "starting lesson " + lesson.title;
    },

    //streak count how many days in a row a player has played. it first checks if you have played at all. if no its 0. 
    //otherwise your streak starts at 1, it makes a for loop starting from the latest date and go backwards. 
    //it subtracts yesterdays date from todays date and divide it by the amt of milliseconds in a day becuz
    //thats what u get when u subtract dates
    //if the difference is 1 then continue the for loop and increase streak, else break and start from 1 again. 
    streak: function(username){
        const player = this.findPlayer(username);
        const days = player.daysPlayed;
        if (days.length == 0){
            return "0";
        }
        let streak =1;
        for (let i = days.length -1; i>0; i--){
            const day = new Date(days[i]);
            const dayBefore = new Date(days[i-1]);
            const difference = (day-dayBefore)/(1000*60*60*24);
            if (difference == 1){
                streak++;
            }
            else{
                break;
            }
        }
        return streak;
    }
}