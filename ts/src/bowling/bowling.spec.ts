class BowlingEstimator {
  getScore(frames: string): number {
    let result = 0;
    const allFrames = frames.split(" ");
    allFrames.forEach((f, index) => {
      result += this.getFrameScore(f);
      if (this.isSpare(f)) {
        result += this.computeSpare(allFrames, index)
      }
      else if (this.isStrike(f)) {
        result += this.computeStrike(allFrames, index);
      }
    });
    return result;
  }

  private computeSpare(allFrames: string[], index: number) {
    return this.getThrowScore(allFrames[index + 1][0]);
  }

  private computeStrike(allFrames: string[], index: number) {
    let result = this.getThrowScore(allFrames[index + 1][0]);
    if (this.isStrike(allFrames[index +1])) {
      result += this.getThrowScore(allFrames[index+2][0]);
    } else {
      result += this.getThrowScore(allFrames[index + 1][1]);
    }
    return result;
  }

  private isSpare(f: string) {
    return f[1] === "/";
  }

  private getFrameScore(frame: string) {
    if (this.isSpare(frame) || this.isStrike(frame)) {
      return 10;
    }
    return this.getThrowScore(frame[0]) + this.getThrowScore(frame[1]);
  }

  private getThrowScore(aThrow: string) {
    if (this.isStrike(aThrow)) {
      return 10;
    } else if (this.didTouch(aThrow)) {
      return parseInt(aThrow);
    }
    return 0;
  }

  private didTouch(aThrow: string) {
    return aThrow !== "-";
  }

  private isStrike(frame: string) {
    return frame[0] === "X";
  }
}



describe("Bowling Estimator", () => {
  let estimator: BowlingEstimator;

  function expectScoreForFramesToBe(frames: string, expectedScore: number) {

    // ACT
    const score = estimator.getScore(frames);

    // ASSERT
    expect(score).toBe(expectedScore);
  }

  beforeEach(() => {
    estimator = new BowlingEstimator();
  });

  it("should return 0 if user misses all his/her shots", function() {
    expectScoreForFramesToBe("-- -- -- -- -- -- -- -- -- --", 0);
  });

  it("should add the score of first frame", function() {
    expectScoreForFramesToBe("3- -- -- -- -- -- -- -- -- --", 3);
  });

  it("should add the score the two throws for a frame", function() {
    expectScoreForFramesToBe("35 -- -- -- -- -- -- -- -- --", 8);
  });

  it("should add the score of the frames", function() {
    expectScoreForFramesToBe("35 11 -- -- -- -- -- -- -- --", 10)
  });

  it("should count 10 for the frame in case of a spare", function() {
    expectScoreForFramesToBe("35 1/ -- -- -- -- -- -- -- --", 18)
  });

  it("should add the next throw in case of a spare", function() {
    expectScoreForFramesToBe("35 1/ 2- -- -- -- -- -- -- --", 22)
  });

  it("should count 10 points for a strike", function() {
    expectScoreForFramesToBe("35 X -- -- -- -- -- -- -- --", 18)
  });

  it("should add the next two throws in case of a strike", function() {
    expectScoreForFramesToBe("35 X 12 -- -- -- -- -- -- --", 24)
  });

  it("should add the next two throws even if next throw is a strike", function() {
    expectScoreForFramesToBe("35 X X 1- -- -- -- -- -- --", 41)
  });
});