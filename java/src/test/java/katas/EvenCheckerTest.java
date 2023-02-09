package katas;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EvenCheckerTest {

    private EvenChecker checker;

    @BeforeEach()
    void setUp() {
        checker = new EvenChecker();
    }

    @Test
    void should_returnTrueForZero(){
        assertTrue(checker.isEven());
    }

    @Test
    void should_returnFalseForOne() {
        checker.add(1);
        assertFalse(checker.isEven());
    }

    @Test
    void should_returnFalseForFive() {
        checker.add(5);

        assertFalse(checker.isEven());
    }
}