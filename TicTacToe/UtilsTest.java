import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class UtilsTest {
    @Test
    public void testRowAndColToPlacement(){
        assertEquals(Utils.rowAndColToPlacement(0, 0, 3), 1);
        assertEquals(Utils.rowAndColToPlacement(2, 2, 3), 9);
        assertEquals(Utils.rowAndColToPlacement(1, 2, 3), 6);
    }
}
