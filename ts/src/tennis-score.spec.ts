import { TennisScore } from "./tennis-score";

describe("TennisScore", function() {
  let tennisScore: TennisScore;

  beforeEach(() => {
    // ARRANGE
    tennisScore = new TennisScore();
  })

  it("should return Love All by default", function() {
    expect(tennisScore.getScore()).toBe('0 - 0');
  });

  it("should return 15-0 if player1 scores", function() {
    tennisScore.player1Scores();

    expect(tennisScore.getScore()).toBe('15 - 0');
  });

  it("should return 30-0 if player1 scores twice", function() {
    // ARRANGE
    tennisScore.player1Scores().player1Scores();

    // ACT
    const score = tennisScore.getScore();

    // ASSERT
    expect(score).toBe('30 - 0');
  });

  it("should return Adv to player 2 if player2 scores at 40 All", function() {
    tennisScore.player1Scores().player1Scores().player1Scores().player2Scores().player2Scores().player2Scores().player2Scores();

    expect(tennisScore.getScore()).toBe('40 - Adv.');
  });

  it("should return Adv to player 1 if player1 scores at 40 All", function() {
    tennisScore.player1Scores().player1Scores().player1Scores().player2Scores().player2Scores().player2Scores().player1Scores();

    expect(tennisScore.getScore()).toBe('Adv. - 40');
  });
});