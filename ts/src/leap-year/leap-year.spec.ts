function isLeapYear(year: number) {
  return isDividableBy(year, 400) || (isDividableBy(year, 4) && !isDividableBy(year, 100));
}

function isDividableBy(year: number, divider: number): boolean {
  return year % divider === 0;
}

describe("Leapyear", () => {
  it("should return true if year is divisible by 400", function() {
    expect(isLeapYear(2000)).toBe(true);
  });

  it("should return false if year is divisible by 100 by not 400", function() {
    expect(isLeapYear(2100)).toBe(false)
  });

  it("should return true if year is divisible by 4", function() {
    expect(isLeapYear(2004)).toBe(true)
  });

  it("should return false if year is not divisible by 4", function() {
    expect(isLeapYear(2001)).toBe(false)
  });
})