import "jest";
import TripService from "./TripService";
import Trip from "./Trip";
import User from "../user/User";
import UserNotLoggedInException from "../exception/UserNotLoggedInException";


class TestableTripService extends TripService {
    public user: User | null = null;
    public tripsToReturn: Trip[] = [];

    protected getLoggedUser(): User | null {
        return this.user; // User is not logged
    }

    protected getTrips(): Trip[] {
        return this.tripsToReturn;
    }
}

describe("TripService", () => {
    let tripService: TestableTripService;

    beforeEach(() => {
        tripService = new TestableTripService();
    })

    it("should throw exception when user is not logged ", () => {
        tripService.user = null;
        expect(() => tripService.getTripsByUser(new User())).toThrow(new UserNotLoggedInException());
    });

    describe("when user is logged", () => {
        it("should return no trips if target user has no friend", () => {
            tripService.user = new User();

            const targetUser = new User();
            expect(tripService.getTripsByUser(targetUser)).toHaveLength(0);
        });

        it("should return no trips if target user has not logged user as friend", () => {
            tripService.user = new User();

            const bob = new User();
            bob.addFriend(new User());

            expect(tripService.getTripsByUser(bob)).toHaveLength(0);
        });

        it("should return bob trips if bob is friend with logged user Alice", () => {
            const alice = new User();
            tripService.user = alice;

            const bob = new User();
            bob.addFriend(new User());
            bob.addFriend(alice);

            tripService.tripsToReturn.push(new Trip());

            expect(tripService.getTripsByUser(bob)).toHaveLength(1);
        });

    });
});
