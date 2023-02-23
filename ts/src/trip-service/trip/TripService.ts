import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {

    public getTripsByUser(user: User): Trip[] {
        const loggedUser = this.getUser();

        if (this.isFriendWith(user, loggedUser)) {
            return this.getTrips(user);
        }

        return [];
    }

    private getUser() {
        const loggedUser: User | null = this.getLoggedUser();

        if (loggedUser === null) {
            throw new UserNotLoggedInException();
        }
        return loggedUser;
    }

    private isFriendWith(user: User, loggedUser: User) {
        let isFriend = false;
        for (const friend of user.getFriends()) {
            if (friend === loggedUser) {
                isFriend = true;
                break;
            }
        }
        return isFriend;
    }

    protected getTrips(user: User) {
        return TripDAO.findTripsByUser(user);
    }

    protected getLoggedUser(): User | null {
        return UserSession.getLoggedUser();
    }
}
